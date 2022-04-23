import { LOEYBConfigService } from '../../../../libs/common/src/config/loeyb-config.service';
import { Payload } from '@libs/common/interface';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private configService: LOEYBConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.jwtSecret,
    });
  }

  async validate(payload: Payload) {
    if (payload.iss != 'loeyb.ai') return undefined;
    if (payload.aud == null) return undefined;
    return { email: payload.aud };
  }
}
