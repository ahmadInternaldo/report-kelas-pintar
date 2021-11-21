import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async statusCheck(): Promise<{ server: string; environment: string }> {
    return {
      server: 'Active',
      environment: process.env.ENVIRONMENT,
    };
  }
}
