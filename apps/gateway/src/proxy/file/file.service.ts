import { LOEYBConfigService } from '@libs/common/config/loeyb-config.service';
import { RegisterFileInput, RequestFileInput } from '@libs/common/dto';
import { LOEYBException, LOEYBFileOutput } from '@libs/common/model';
import {
  HttpException,
  HttpService,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { createReadStream, ReadStream } from 'fs';
import { S3, AWSError } from 'aws-sdk';
import { LOEYBErrorCode } from '@libs/common/constant';
import { Readable } from 'stream';

@Injectable()
export class FileService {
  private readonly logger: Logger;
  constructor(
    private readonly config: LOEYBConfigService,
    @Inject('FILE_SERVICE') private fileClient: ClientProxy,
    private readonly httpService: HttpService,
  ) {
    this.logger = new Logger('FileService');
  }

  get s3Instance(): S3 {
    return new S3({
      accessKeyId: this.config.awsAccessKey,
      secretAccessKey: this.config.awsSecretAccessKey,
    } as S3.Types.ClientConfiguration);
  }
  /**
   * upload to s3 instance
   */
  async uploadFile(file: Express.Multer.File): Promise<LOEYBFileOutput> {
    try {
      const { filename, originalname, mimetype, size, path } =
        file as Express.Multer.File;
      const stream: ReadStream = createReadStream(path);
      const params: S3.Types.PutObjectRequest = {
        Bucket: this.config.awsS3BucketKey,
        Key: filename.split('.')[0],
        Body: stream,
      } as S3.Types.PutObjectRequest;
      const input: RegisterFileInput = await this.s3Instance
        .upload(params)
        .promise()
        .then(
          (data: S3.ManagedUpload.SendData): RegisterFileInput =>
            ({
              id: data.Key,
              s3Uri: data.Key,
              fileName: originalname,
              fileExtension: originalname.split('.').pop(),
              fileMimetype: mimetype,
              filePath: '/',
              size: size,
            } as RegisterFileInput),
        )
        .catch((error: AWSError) => {
          this.logger.error(error);
          throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        });
      return await this.registerFile(input);
    } catch (error) {}
  }

  /**
   * registerFile
   *
   * @param input @see {RegisterFileInput}
   * @returns
   */
  async registerFile(input: RegisterFileInput): Promise<LOEYBFileOutput> {
    try {
      console.log(input);
      return await this.fileClient
        .send<LOEYBFileOutput, RegisterFileInput>(
          { cmd: 'registerFile' },
          input,
        )
        .toPromise();
    } catch (error) {
      this.logger.error(error.message);
      throw new LOEYBException(LOEYBErrorCode.ERROR, error.message);
    }
  }

  async download(input: RequestFileInput): Promise<Readable> {
    const params: S3.Types.GetObjectRequest = {
      Bucket: this.config.awsS3BucketKey,
      Key: input.fileId,
    } as S3.Types.GetObjectRequest;
    return await this.s3Instance
      .headObject(params)
      .promise()
      .then((): Readable => {
        return this.s3Instance.getObject(params).createReadStream();
      })
      .catch((error: AWSError) => {
        this.logger.error(error.message);
        throw new LOEYBException(
          LOEYBErrorCode.FILE_NOT_FOUND,
          error.statusCode,
        );
      });
  }
}
