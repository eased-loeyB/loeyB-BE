import { CommonModule } from '@libs/common';
import { MulterConfigService } from '@libs/common/config/multer-config.service';
import { HttpModule, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FILE_FACTORY } from '../../factory';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { FileResolver } from './file.resolver';

@Module({
  imports: [
    HttpModule,
    CommonModule,
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
  ],
  controllers: [FileController],
  providers: [FileService, FILE_FACTORY, FileResolver],
  exports: [FileService],
})
export class FileModule {}
