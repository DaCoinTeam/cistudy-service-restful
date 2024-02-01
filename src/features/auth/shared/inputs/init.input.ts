import { ApiProperty } from "@nestjs/swagger"
import { IsUUID } from "class-validator"

export default class InitInput {
  @IsUUID("4")
  @ApiProperty()
  	userId: string
}
