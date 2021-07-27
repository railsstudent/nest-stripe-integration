import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import Stripe from 'stripe'
import { CreateCustomerDto, CreditCard } from '../dtos'

@Injectable()
export class StripeService {
  constructor(@Inject('StripeClient') private stripeClient: Stripe) {}

  async createCard(customerId: string, card: CreditCard): Promise<void> {
    const { number = '', cvc = '', name: cardholder = '', expYear = '', expMonth = '' } = card
    const token = await this.stripeClient.tokens.create({
      card: {
        number,
        cvc,
        name: cardholder,
        exp_month: expMonth,
        exp_year: expYear,
      },
    })

    if (!token) {
      throw new BadRequestException('Token is not created')
    }

    const defaultCard = await this.stripeClient.customers.createSource(customerId, {
      source: token.id,
    })

    if (!defaultCard) {
      throw new BadRequestException('Default card is not created')
    }
  }

  async createCustomer(dto: CreateCustomerDto): Promise<Stripe.Response<Stripe.Customer>> {
    const { card = null, email, name, description } = dto || {}

    if (!card) {
      throw new BadRequestException('Card information is not found')
    }

    const { data } = await this.stripeClient.customers.list({
      email,
      limit: 1,
    })

    if (data.length > 0) {
      throw new BadRequestException('Customer email is found')
    }

    const newCustomer = await this.stripeClient.customers.create({ email, name, description })
    if (!newCustomer) {
      throw new BadRequestException('Customer is not created')
    }

    await this.createCard(newCustomer.id, card)
    return newCustomer
  }

  async getCustomer(customerId: string): Promise<Stripe.Customer | null> {
    const customer = await this.stripeClient.customers.retrieve(customerId)

    if (customer.deleted) {
      return null
    }

    const { headers, lastResponse, ...rest } = customer
    return rest as Stripe.Customer
  }
}
