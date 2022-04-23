import { EntityRepository, Repository } from 'typeorm';
import { LOEYBUserRecordsEntity } from '../entities';

@EntityRepository(LOEYBUserRecordsEntity)
export class LOEYBUserRecordsRepository extends Repository<LOEYBUserRecordsEntity> {}
