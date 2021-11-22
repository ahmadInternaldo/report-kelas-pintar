import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { ReportModule } from './report/report.module';
import { JwtAuthModule } from './utils/authentications/jwt/jwt.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './utils/entities/user.entity';
import { Subject } from './utils/entities/subject.entity';
import { Chapter } from './utils/entities/chapter.entity';
import { Report } from './utils/entities/report.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.HOST,
      port: +process.env.PORT,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      models: [User, Subject, Chapter, Report]
    }),
    LoginModule,
    ReportModule,
    JwtAuthModule,
    JwtModule.register({})
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
