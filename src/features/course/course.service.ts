import { Controller, NotFoundException, UnauthorizedException } from "@nestjs/common"
import { GrpcMethod } from "@nestjs/microservices"
import { CourseMySqlEntity, UserMySqlEntity } from "@database"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Sha256Service } from "@global"
import { FormDataRequestBody } from "@shared"
import { CreateData } from "./shared/interfaces"

@Controller()
export default class AuthService  {
    constructor(
        @InjectRepository(UserMySqlEntity)
        private readonly courseMySqlRepository: Repository<CourseMySqlEntity>,
        private readonly sha256Service: Sha256Service
    ){}

    @GrpcMethod("CourseService", "Create")
    async create(body: FormDataRequestBody<CreateData>): Promise<CourseMySqlEntity> {
        const { data, files } = body
        return this.courseMySqlRepository.create(data)
    }
}