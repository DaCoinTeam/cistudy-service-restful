import { Controller } from "@nestjs/common"
import { GrpcMethod } from "@nestjs/microservices"
import { CourseMySqlEntity } from "@database"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { SerializableFormData, WithUserId } from "@common"
import { CreateData } from "./shared"
import { AssetsManagerService } from "@global"

@Controller()
export default class CourseService {
    constructor(
    @InjectRepository(CourseMySqlEntity)
    private readonly courseMySqlRepository: Repository<CourseMySqlEntity>,
    private readonly assetsManagerService: AssetsManagerService,
    ) {}

  @GrpcMethod("CourseService", "Create")
    async create(body: WithUserId<SerializableFormData<CreateData>>) {
        const { description, price, title } = body.data
        const promises: Array<Promise<void>> = []

        let thumbnailId: string
        const thumbnail = body.files.at(0)
        const uploadThumbnailPromise = async () => {
            const { assetId } = await this.assetsManagerService.upload(thumbnail)
            thumbnailId = assetId
        }
        promises.push(uploadThumbnailPromise())

        let previewVideoId: string
        const previewVideo = body.files.at(1)
        const uploadPreviewVideoPromise = async () => {
            const { assetId } = await this.assetsManagerService.upload(previewVideo)
            previewVideoId = assetId
        }
        promises.push(uploadPreviewVideoPromise())

        await Promise.all(promises)

        const created = await this.courseMySqlRepository.save({
            creatorId: body.userId,
            description,
            price,
            title,
            thumbnailId,
            previewVideoId,
        })

        if (created)
            return `Course with id ${created.courseId} has been creeated successfully.`
    }
}
