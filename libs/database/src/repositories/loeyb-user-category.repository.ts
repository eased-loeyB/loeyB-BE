import { EntityRepository, Repository } from 'typeorm';
import { LOEYBUserCategoryEntity } from '../entities';

@EntityRepository(LOEYBUserCategoryEntity)
export class LOEYBUserCategoryRepository extends Repository<LOEYBUserCategoryEntity> {}
