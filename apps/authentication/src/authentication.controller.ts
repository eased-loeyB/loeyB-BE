import { Controller, Logger } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RegisterUserInput, SayHelloInput } from '../../../libs/common/src/dto';
import { SayHelloOutput, LOEYBException } from '../../../models';
import { RegisterUserOutput } from '@app/common/model';
import { EntityManager, getConnection, QueryRunner } from 'typeorm';
@Controller()
export class AuthenticationController {
  private logger: Logger;
  constructor(private readonly authenticationService: AuthenticationService) {
    this.logger = new Logger('AuthenticationController');
  }

  @MessagePattern({ cmd: 'sayHello' })
  async sayHello(@Payload() input: SayHelloInput): Promise<string> {
    try {
      return await this.authenticationService.sayHello(input);
    } catch (error) {
      return 'LOEYBException.processException(error)';
    }
  }

  @MessagePattern({ cmd: 'registerUser' })
  async registerUser(
    @Payload() input: RegisterUserInput,
  ): Promise<RegisterUserOutput> {
    const queryRunner: QueryRunner = getConnection().createQueryRunner();
    try {
      await queryRunner.startTransaction();
      const entityManager: EntityManager = queryRunner.manager;
      const result = await this.authenticationService.registerUser(
        input,
        entityManager,
      );
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return LOEYBException.processException(error);
    } finally {
      await queryRunner.release();
    }
  }
}
