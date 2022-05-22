import { EntityRepository, Repository } from 'typeorm';
import { LOEYBUserAreaCategoryEntity } from '../entities';

@EntityRepository(LOEYBUserAreaCategoryEntity)
export class LOEYBUserAreaCategoryRepository extends Repository<LOEYBUserAreaCategoryEntity> {
  async findRegisteredCategoryAndArea(
    userId: string,
    category: string,
    area: string,
  ): Promise<LOEYBUserAreaCategoryEntity[]> {
    return await this.query(
      `
        select *
        from 
          loeyb_user_area_category as luac
        where 
        luac.user_id = '${userId}' and luac.category = '${category}' and luac.area = '${area}';
      `,
    );
  }

  async findRegisteredUser(
    userId: string,
  ): Promise<LOEYBUserAreaCategoryEntity> {
    return await this.findOne({
      where: {
        userId: userId,
      },
    });
  }

  async findRegisteredAreasAndCategories(
    userId: string,
  ): Promise<LOEYBUserAreaCategoryEntity[]> {
    return await this.query(
      `
        select 
        luac.area, luac.category 
        from 
          loeyb_user_area_category as luac
        where 
        luac.user_id = '${userId}'
      `,
    );
  }
}
