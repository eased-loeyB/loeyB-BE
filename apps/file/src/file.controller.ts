import { RegisterFileInput } from '@libs/common/dto';
import { LOEYBFileOutput } from '@libs/common/model';
import { TransactionBlock } from '@libs/common/transaction/transaction';
import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FileService } from './file.service';

@Controller()
export class FileController {
  private logger: Logger;

  constructor(private readonly fileService: FileService) {
    this.logger = new Logger('FileController');
  }

  @MessagePattern({ cmd: 'registerFile' })
  async registerFile(
    @Payload() input: RegisterFileInput,
  ): Promise<LOEYBFileOutput> {
    console.log(input);
    return await TransactionBlock(
      input,
      async (input, entityManager): Promise<LOEYBFileOutput> => {
        return await this.fileService.registerFile(
          input as RegisterFileInput,
          entityManager,
        );
      },
    );
  }
}
