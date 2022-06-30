import { EntityRepository, Repository } from 'typeorm';
import { LOEYBUserDeviceTokenEntity } from '../entities';

@EntityRepository(LOEYBUserDeviceTokenEntity)
export class LOEYBUserDeviceTokenRepository extends Repository<LOEYBUserDeviceTokenEntity> {}
