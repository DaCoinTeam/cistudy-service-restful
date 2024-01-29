import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsStrongPassword, Length } from "class-validator"

export default class SignInRequestBody {
  @IsEmail()
  @ApiProperty()
  	email: string
    
  @IsStrongPassword()
  @Length(6, 20)
  @ApiProperty()
  	password: string
}
