import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/utils/entities/user.entity';
import { JwtAuthService } from 'src/utils/authentications/jwt/jwt.service';
import { JwtModule } from '@nestjs/jwt';
import { Report } from 'src/utils/entities/report.entity';

@Module({
  imports: [SequelizeModule.forFeature([User, Report]), JwtModule.register({})],
  controllers: [LoginController],
  providers: [LoginService, JwtAuthService],
})
export class LoginModule {}
