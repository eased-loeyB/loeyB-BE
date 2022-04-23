import { EntityRepository, Repository } from 'typeorm';
import { LOEYBFileEntity } from '../entities';

@EntityRepository(LOEYBFileEntity)
export class LOEYBFileRepository extends Repository<LOEYBFileEntity> {}
