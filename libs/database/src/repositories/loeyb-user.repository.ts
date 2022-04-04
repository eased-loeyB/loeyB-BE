import { EntityRepository, Repository } from 'typeorm';
import { LOEYBUserEntity } from '../entities';

@EntityRepository(LOEYBUserEntity)
export class LOEYBUserRepository extends Repository<LOEYBUserEntity> {
  async findRegisteredUserByEmail(
    email: any,
  ): Promise<LOEYBUserEntity | undefined> {
    return this.findOne({
      where: {
        email: email,
      },
    });
  }
}
