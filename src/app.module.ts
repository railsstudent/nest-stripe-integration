import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { StripeModule } from './stripe'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    StripeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
