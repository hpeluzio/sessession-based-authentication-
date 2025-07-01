import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  private readonly fakeUser = {
    id: '1',
    email: 'admin@test.com',
    passwordHash:
      '$2b$10$LuevqLwvYoQfHsBASnlWfekSwKYokObniZ7L586XIK1NfdgV9jvw.', // hash "123456"
  };

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async validateUser(email: string, password: string) {
    if (email !== this.fakeUser.email) {
      throw new UnauthorizedException('Invalid user');
    }

    const isMatch = await bcrypt.compare(password, this.fakeUser.passwordHash);

    if (!isMatch) {
      throw new UnauthorizedException('Wrong password');
    }

    return isMatch
      ? { id: this.fakeUser.id, email: this.fakeUser.email }
      : null;
  }

  async getTokens(userId: string, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email },
        { secret: process.env.ACCESS_SECRET, expiresIn: '5s' },
        // { secret: process.env.ACCESS_SECRET, expiresIn: '1h' },
      ),
      this.jwtService.signAsync(
        { sub: userId, email },
        // { secret: process.env.REFRESH_SECRET, expiresIn: '7d' },
        { secret: process.env.REFRESH_SECRET, expiresIn: '10s' },
      ),
    ]);
    return { accessToken, refreshToken };
  }
}
