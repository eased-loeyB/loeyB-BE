import { LOEYBErrorCode } from '@libs/common/constant';
import { RegisterFileInput } from '@libs/common/dto';
import { LOEYBFile, LOEYBFileOutput } from '@libs/common/model';
import { LOEYBFileEntity } from '@libs/database/entities';
import { LOEYBFileRepository } from '@libs/database/repositories';
import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

@Injectable()
export class FileService {
  /**
   * registerFile
   *
   * @param input @see {RegisterFileInput}
   * @param entityManager @see {EntityManager}
   * @returns {Promise<CAPAFileOutput>}
   */
  async registerFile(
    input: RegisterFileInput,
    entityManager: EntityManager,
  ): Promise<LOEYBFileOutput> {
    const loeybFileRepository: LOEYBFileRepository =
      entityManager.getCustomRepository<LOEYBFileRepository>(
        LOEYBFileRepository,
      );

    let file: LOEYBFileEntity = loeybFileRepository.create({
      id: input.id,
      s3Uri: input.s3Uri,
      fileName: input.fileName,
      fileExtension: input.fileExtension,
      fileMimetype: input.fileMimetype,
      filePath: input.filePath,
      size: input.size,
    });

    file = await loeybFileRepository.save(file);

    return {
      result: LOEYBErrorCode.SUCCESS,
      data: {
        fileId: file.id,
        fileName: file.fileName,
        fileExtension: file.fileExtension,
        fileMimetype: file.fileMimetype,
        fileSize: file.size,
      } as LOEYBFile,
    } as LOEYBFileOutput;
  }
}
