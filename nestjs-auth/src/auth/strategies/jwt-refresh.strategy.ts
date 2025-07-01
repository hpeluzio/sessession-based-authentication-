import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: (req) => req?.cookies?.['refresh_token'],
      secretOrKey: process.env.REFRESH_SECRET,
    });
  }

  validate(payload: any) {
    if (!payload) throw new UnauthorizedException();
    return payload;
  }
}
