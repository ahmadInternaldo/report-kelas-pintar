import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { RequestLoginDto, ResponseLoginDto } from './dto/login.dto';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async login(@Body() requestData: RequestLoginDto): Promise<ResponseLoginDto> {
    return this.loginService.login(requestData);
  }
}
