import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async statusCheck(): Promise<{ server: string; environment: string }> {
    return this.appService.statusCheck();
  }
}
