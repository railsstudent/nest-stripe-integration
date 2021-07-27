import { IsEmail, IsNotEmpty, IsString, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { CreditCard } from './credit-card'

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  description: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @ValidateNested()
  @Type(() => CreditCard)
  card: CreditCard
}
