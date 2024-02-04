import { DataWithUserId } from "@common"
import { ApiProperty } from "@nestjs/swagger"
import { IsUUID, Length } from "class-validator"

export class CreateSectionData {
  @IsUUID("4")
  @ApiProperty()
      courseId: string

  @Length(200)
  @ApiProperty()
      title: string
}

type CreateSectionInput = DataWithUserId<CreateSectionData>
export default CreateSectionInput