import { EntityRepository, Repository } from 'typeorm';
import { LOEYBUserRecordsEntity } from '../entities';

@EntityRepository(LOEYBUserRecordsEntity)
export class LOEYBUserRecordsRepository extends Repository<LOEYBUserRecordsEntity> {
  async findAllTag(userId: string) {
    return this.query(
      `
      select * from loeyb_user_records lur where lur.user_id = $1
    `,
      [userId],
    );
  }
}
