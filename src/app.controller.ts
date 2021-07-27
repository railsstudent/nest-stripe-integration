import { Controller, Get } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private configService: ConfigService) {}

  @Get()
  getHello(): string {
    const xxx = this.configService.get<string>('STRIPE_SECRET_KEY')
    console.log('key', xxx)
    return this.appService.getHello()
  }
}
