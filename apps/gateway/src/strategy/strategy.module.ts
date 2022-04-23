import { LOEYBConfigModule } from '@libs/common/config/loeyb-config.module';
import { LOEYBConfigService } from '@libs/common/config/loeyb-config.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defatulStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [LOEYBConfigModule],
      useFactory: async (config: LOEYBConfigService) => ({
        secret: config.jwtSecret,
      }),
      inject: [LOEYBConfigService],
    }),
  ],
  providers: [JwtStrategy],
})
export class StrategyModule {}
