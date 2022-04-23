import { LOEYBErrorCode } from '@libs/common/constant';
import { LOEYBException, LOEYBFileOutput, Output } from '@libs/common/model';
import {
  Controller,
  HttpStatus,
  Logger,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileService } from './file.service';

@ApiTags('File')
@Controller('file')
export class FileController {
  private readonly logger: Logger;
  private readonly serviceName: string = 'File';

  constructor(private readonly fileService: FileService) {
    this.logger = new Logger('FileController');
  }

  @ApiOperation({
    summary: 'Upload a file',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data', 'form-data')
  @ApiResponse({ type: () => LOEYBFileOutput })
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() request: Request,
  ): Promise<LOEYBFileOutput> {
    try {
      return await this.fileService.uploadFile(file);
    } catch (error) {
      throw new LOEYBException(LOEYBErrorCode.ERROR, HttpStatus.BAD_REQUEST);
    }
  }
}
