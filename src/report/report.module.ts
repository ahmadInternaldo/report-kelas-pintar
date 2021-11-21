import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/utils/entities/user.entity';
import { Subject } from 'src/utils/entities/subject.entity';
import { Chapter } from 'src/utils/entities/chapter.entity';
import { Report } from 'src/utils/entities/report.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthService } from 'src/utils/authentications/jwt/jwt.service';

@Module({
  imports: [SequelizeModule.forFeature([User, Subject, Chapter, Report]), JwtModule.register({})],
  controllers: [ReportController],
  providers: [ReportService, JwtAuthService]
})
export class ReportModule {}
