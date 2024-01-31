import { ApiProperty } from "@nestjs/swagger"
import { IsUUID } from "class-validator"

export default class InitData {
  @IsUUID("4")
  @ApiProperty()
  	userId: string
}
