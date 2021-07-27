import { Module } from '@nestjs/common'
import { StripeService } from './services'
import { StripeController } from './stripe.controller'

@Module({
  providers: [StripeService],
  controllers: [StripeController],
})
export class StripeModule {}
