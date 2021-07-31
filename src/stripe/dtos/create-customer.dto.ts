import { IsEmail, IsNotEmpty, IsString, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { CreditCardDto } from './credit-card.dto'

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
  @Type(() => CreditCardDto)
  card: CreditCardDto
}
