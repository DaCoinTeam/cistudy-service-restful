import { ApiProperty } from "@nestjs/swagger"
import { IsJWT } from "class-validator"

export default class VerifyGoogleAccessTokenInput {
  @IsJWT()
  @ApiProperty()
      token: string
}
