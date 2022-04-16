import { EntityManager, getConnection, QueryRunner } from 'typeorm';

import { AbstractInput } from '../dto/abstract.input';
import { LOEYBException } from '../model/exception.model';

export const TransactionBlock = async (
  input: AbstractInput,
  func: (input: AbstractInput, entityManager: EntityManager) => Promise<any>,
  errorHandler?: (err: any) => void,
): Promise<any> => {
  const queryRunner: QueryRunner = getConnection().createQueryRunner();
  try {
    await queryRunner.startTransaction();
    const entityManager: EntityManager = queryRunner.manager;
    const ret = await func(input, entityManager);
    await queryRunner.commitTransaction();
    return ret;
  } catch (error) {
    await queryRunner.rollbackTransaction();
    if (errorHandler != null) errorHandler(error);
    else {
      return LOEYBException.processException(error);
    }
  } finally {
    await queryRunner.release();
  }
};
