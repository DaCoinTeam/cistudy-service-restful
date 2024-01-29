import { ApiProperty } from "@nestjs/swagger"
import { IsJWT } from "class-validator"

export default class VerifyGoogleAccessTokenData {
  @IsJWT()
  @ApiProperty()
      token: string
}
