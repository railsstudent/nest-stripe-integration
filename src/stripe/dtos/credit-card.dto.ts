import { IsNotEmpty, IsNumberString, IsString } from 'class-validator'

export class CreditCardDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  number: string

  @IsNotEmpty()
  @IsNumberString()
  expMonth: string

  @IsNotEmpty()
  @IsNumberString()
  expYear: string

  @IsNotEmpty()
  @IsNumberString()
  cvc: string
}
