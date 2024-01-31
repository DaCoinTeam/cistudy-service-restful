import {
    Controller,
} from "@nestjs/common"
import { GrpcMethod } from "@nestjs/microservices"
import { CourseMySqlEntity } from "@database"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { SerializableFormData, WithUserId } from "@common"
import { CreateData } from "./shared"

@Controller()
export default class CourseService {
    constructor(
    @InjectRepository(CourseMySqlEntity)
    private readonly courseMySqlRepository: Repository<CourseMySqlEntity>,
    ) {}

  @GrpcMethod("CourseService", "Create")
    async create(body: WithUserId<SerializableFormData<CreateData>>) {
    //: Promise<CourseMySqlEntity>
        console.log(body)
    }
}
