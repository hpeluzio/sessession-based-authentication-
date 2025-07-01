import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    if (info?.name === 'TokenExpiredError') {
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'Access token expired',
        code: 'TOKEN_EXPIRED',
      });
    }

    if (err || !user) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'Invalid or missing access token',
        code: 'INVALID_TOKEN',
      });
    }

    return user;
  }
}
