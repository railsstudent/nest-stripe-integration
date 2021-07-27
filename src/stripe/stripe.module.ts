import { ConfigService } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { StripeService } from './services'
import { StripeController } from './stripe.controller'
import Stripe from 'stripe'

const StripeProvider = {
  provide: 'StripeClient',
  inject: [ConfigService],
  useFactory: (service: ConfigService) => {
    const secretKey = service.get<string>('STRIPE_SECRET_KEY') || ''
    const stripe = new Stripe(secretKey, {
      apiVersion: '2020-08-27',
    })
    return stripe
  },
}

@Module({
  providers: [StripeService, StripeProvider],
  controllers: [StripeController],
})
export class StripeModule {}
