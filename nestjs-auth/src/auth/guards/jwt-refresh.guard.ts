import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt-refresh') {
  handleRequest(err: any, user: any, info: any) {
    if (info?.name === 'TokenExpiredError') {
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'Refresh token expired',
        code: 'REFRESH_TOKEN_EXPIRED',
      });
    }

    if (err || !user) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'Invalid or missing refresh token',
        code: 'INVALID_REFRESH_TOKEN',
      });
    }

    return user;
  }
}
