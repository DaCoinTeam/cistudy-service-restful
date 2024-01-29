import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, Length } from "class-validator"

export default class CreateData {
  @Length(20)
  @ApiProperty()
      title: string

  @Length(100)
  @ApiProperty()
      description: string

  @IsNumber()
  @ApiProperty()
      price: number
}
