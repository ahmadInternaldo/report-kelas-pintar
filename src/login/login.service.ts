import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/utils/entities/user.entity';
import { RequestLoginDto, ResponseLoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { saltHashGenerator } from 'src/utils/authentications/password-checker';
import { JwtAuthService } from 'src/utils/authentications/jwt/jwt.service';
import { FilterException } from 'src/utils/exceptions/filter.exception';
import { Report } from 'src/utils/entities/report.entity';

@Injectable()
export class LoginService {
  constructor(
    @InjectModel(User)
    private readonly userRepository: typeof User,
    private readonly jwtService: JwtAuthService,
    @InjectModel(Report)
    private readonly reportRepository: typeof Report,
  ) {}

  async login(requestData: RequestLoginDto): Promise<ResponseLoginDto> {
    try {      
      const { role, username, password } = requestData;

      const findUser = await this.userRepository.findOne({
        where: {
          username,
          role,
        },
      });
      if (!findUser) {
        throw new BadRequestException({
          messageDetail: 'User not found!',
          tokenSession: null,
        });
      } else {
        const checkPassword = await bcrypt.compare(password, findUser.hash);
        if (!checkPassword) {
          throw new BadRequestException({
            messageDetail: 'User or password incorrect!',
            tokenSession: null,
          });
        } else {
          const newTokenSession = await this.jwtService.signAsync({
            id: findUser.id,
          });
          await this.userRepository.update(
            { tokenSession: newTokenSession },
            {
              where: {
                id: findUser.id,
              },
            },
          );
          return {
            messageDetail: 'success!',
            tokenSession: newTokenSession,
          };
        }
      }
    } catch (error) {
      throw new FilterException(error);
    }
  }
}
