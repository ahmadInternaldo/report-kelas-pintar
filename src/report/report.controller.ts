import { Controller, Get, Headers, Post, Query } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('all-data')
  async allData(@Query('grade') requestData: string, @Headers() headers: any): Promise<any> {
    return this.reportService.allData(requestData, headers.authorization);
  }
  
}
