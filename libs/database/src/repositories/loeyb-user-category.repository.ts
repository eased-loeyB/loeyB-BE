import { EntityRepository, Repository } from 'typeorm';
import { LOEYBUserCategoryEntity } from '../entities';

@EntityRepository(LOEYBUserCategoryEntity)
export class LOEYBUserCategoryRepository extends Repository<LOEYBUserCategoryEntity> {
  async findRegisteredCategoryAndArea(
    userId: string,
    category: string,
    area: string,
  ): Promise<LOEYBUserCategoryEntity[]> {
    return await this.query(
      `
        select *
        from 
          loeyb_user_category as luc
        where 
          luc.user_id = '${userId}' and luc.category = '${category}' and luc.area = '${area}';
      `,
    );
  }

  async findRegisteredUser(userId: string): Promise<LOEYBUserCategoryEntity> {
    return await this.findOne({
      where: {
        userId: userId,
      },
    });
  }

  async findRegisteredAreasAndCategories(
    userId: string,
  ): Promise<LOEYBUserCategoryEntity[]> {
    return await this.query(
      `
        select 
          luc.name, luc.area, luc.category 
        from 
          loeyb_user_category as luc
        where 
          luc.user_id = '${userId}'
      `,
    );
  }
}
