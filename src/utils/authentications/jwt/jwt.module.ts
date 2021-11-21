import { Module } from '@nestjs/common';
import { JwtAuthService } from './jwt.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  providers: [JwtAuthService],
})
export class JwtAuthModule {}
