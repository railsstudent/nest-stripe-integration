import { StripeService } from './services/stripe.service'
import { CreateCustomerDto } from './dtos/create-customer.dto'
import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import Stripe from 'stripe'

@Controller('stripe')
export class StripeController {
  constructor(private service: StripeService) {}

  @Post('customer')
  async createCustomer(@Body() dto: CreateCustomerDto): Promise<Stripe.Response<Stripe.Customer>> {
    return this.service.createCustomer(dto)
  }

  @Get('customer/:customerId')
  async getCustomer(@Param('customerId') customerId: string): Promise<Stripe.Customer | null> {
    return this.service.getCustomer(customerId)
  }
}
