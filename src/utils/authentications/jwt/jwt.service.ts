import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class JwtAuthService {
  constructor(private jwtService: JwtService) {}

  async signAsync(payload): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: process.env.SECRET_KEY,
      expiresIn: +process.env.EXP_TOKEN
    });
  }

  async verifyAsync(token): Promise<any> {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.SECRET_KEY
      });
    } catch (error) {
      throw new BadRequestException({
        message: 'Token session expired'
      });
    }
  }
}
