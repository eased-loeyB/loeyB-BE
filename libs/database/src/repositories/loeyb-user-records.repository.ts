import { FetchSpecificRecordsInput } from '@libs/common/dto';
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
  async findSpecificRecords(input: FetchSpecificRecordsInput) {
    let where = ``;
    if (input.area != null) {
      where += ` and lur.area = ${input.area}`;
    }
    if (input.category != null) {
      where += ` and lur.category = ${input.category}`;
    }
    if (input.tag != null) {
      where += ` and lur.tag = ${input.tag}`;
    }
    return this.query(
      `
        select 
          lur.user_id "userId", lur.file_id "fileId", lur.file_name "fileName", lur.area, lur.category, lur.tag, lur.date, lur.location, lur.importance 
        from 
          loeyb_user_records lur 
        where 
          lur.user_id = $1 
      ` +
        where +
        ';',
      [input.userId],
    );
  }
}
