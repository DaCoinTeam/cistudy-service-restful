import { SerializableFormData, WithUserId } from "@common"
import { ApiProperty } from "@nestjs/swagger"
import { IsUUID, Length } from "class-validator"

export class CreateLectureData {
    @IsUUID("4")
    @ApiProperty()
        sectionId: string

    @Length(200)
    @ApiProperty()
        title: string
}
type CreateLectureInput = WithUserId<SerializableFormData<CreateLectureData>>
export default CreateLectureInput