import { LOEYBUserActivityLogEntity } from '../entities';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(LOEYBUserActivityLogEntity)
export class LOEYBUserActivityLogRepository extends Repository<LOEYBUserActivityLogEntity> {}
