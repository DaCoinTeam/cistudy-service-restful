import { Module } from "@nestjs/common"
import { AuthModule } from "./auth"
import { CourseModule } from "./course"

@Module({
    imports: [AuthModule, CourseModule],
})
export default class FeaturesModule {}
