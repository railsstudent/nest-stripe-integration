import { Test, TestingModule } from '@nestjs/testing'
import { StripeServiceService } from './stripe-service.service'

describe('StripeServiceService', () => {
  let service: StripeServiceService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StripeServiceService],
    }).compile()

    service = module.get<StripeServiceService>(StripeServiceService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
