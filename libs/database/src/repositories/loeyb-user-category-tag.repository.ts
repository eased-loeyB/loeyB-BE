import { EntityRepository, Repository } from 'typeorm';
import { LOEYBUserCategoryTagEntity } from '../entities';

@EntityRepository(LOEYBUserCategoryTagEntity)
export class LOEYBUserCategoryTagRepository extends Repository<LOEYBUserCategoryTagEntity> {}
