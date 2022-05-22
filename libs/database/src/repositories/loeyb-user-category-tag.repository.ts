import { EntityRepository, Repository } from 'typeorm';
import { LOEYBUserCategoryTagEntity } from '../entities';

@EntityRepository(LOEYBUserCategoryTagEntity)
export class LOEYBUserCategoryTagRepository extends Repository<LOEYBUserCategoryTagEntity> {
  async findRegisteredCategoriesAndTags(
    userId: string,
  ): Promise<LOEYBUserCategoryTagEntity[]> {
    return await this.query(
      `
        select luct.category, luct.tag from loeyb_user_category_tag as luct where luct.user_id = '${userId}'
        order by luct.category;
      `,
    );
  }
}
