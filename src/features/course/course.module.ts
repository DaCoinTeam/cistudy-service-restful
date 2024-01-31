import { Module } from "@nestjs/common"
import CourseService from "./course.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import {
    CourseMySqlEntity,
    EnrolledInfoEntity,
    PostCommentMySqlEntity,
    PostMySqlEntity,
    UserMySqlEntity,
    SectionMySqlEnitiy,
    LectureMySqlEntity,
    ResourceMySqlEntity,
    PostContentMySqlEntity,
    PostLikeMySqlEntity,
    PostCommentContentMySqlEntity,
    PostCommentLikeMySqlEntity
} from "@database"

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserMySqlEntity,
            CourseMySqlEntity,
            PostMySqlEntity,
            PostCommentMySqlEntity,
            EnrolledInfoEntity,
            SectionMySqlEnitiy,
            LectureMySqlEntity,
            ResourceMySqlEntity,
            PostContentMySqlEntity,
            PostLikeMySqlEntity,
            PostCommentContentMySqlEntity,
            PostCommentLikeMySqlEntity
        ]),
    ],
    controllers: [CourseService],
    providers: [CourseService],
})
export default class CourseModule {}
