import { LOEYBConfigModule } from '@libs/common/config/loeyb-config.module';
import { LOEYBConfigService } from '@libs/common/config/loeyb-config.service';
import { DatabaseModule } from '@libs/database';
import { Module } from '@nestjs/common';
import { FILE_FACTORY } from 'apps/gateway/src/factory';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
  imports: [LOEYBConfigModule, DatabaseModule],
  controllers: [FileController],
  providers: [FileService, LOEYBConfigService, FILE_FACTORY],
})
export class FileModule {}
