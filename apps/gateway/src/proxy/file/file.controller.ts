import { LOEYBErrorCode } from '@libs/common/constant';
import { RequestFileInput } from '@libs/common/dto';
import { LOEYBException, LOEYBFileOutput, Output } from '@libs/common/model';
import {
  Controller,
  Get,
  HttpStatus,
  Logger,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { LoeybAuth } from '../../decorator';
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
  @ApiBearerAuth('Authorization')
  @LoeybAuth()
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

  @ApiOperation({
    summary: 'Download a file',
  })
  @Get(':fileId')
  @ApiBearerAuth('Authorization')
  @LoeybAuth()
  async download(
    @Param('fileId', new ParseUUIDPipe({ version: '4' })) fileId: string,
    @Res() res: Response,
  ): Promise<any> {
    try {
      this.logger.debug(fileId);
      const file = await this.fileService.download({
        fileId: fileId,
      } as RequestFileInput);
      return file.pipe(res);
    } catch (error) {
      this.logger.error(error.message);
      throw new LOEYBException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
