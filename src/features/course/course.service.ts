import { Controller } from "@nestjs/common"
import { GrpcMethod } from "@nestjs/microservices"
import { CourseMySqlEntity, LectureMySqlEntity, SectionMySqlEnitiy } from "@database"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { MessageResponse } from "@common"
import { CreateCourseInput, CreateLectureInput, CreateSectionInput } from "./shared"
import { AssetsManagerService, MpegDashConverterService } from "@global"
import { GrpcNotFoundException } from "nestjs-grpc-exceptions"

@Controller()
export default class CourseService {
    constructor(
        @InjectRepository(CourseMySqlEntity)
        private readonly courseMySqlRepository: Repository<CourseMySqlEntity>,
        @InjectRepository(SectionMySqlEnitiy)
        private readonly sectionMySqlRepository: Repository<SectionMySqlEnitiy>,
        @InjectRepository(LectureMySqlEntity)
        private readonly lectureMySqlRepository: Repository<LectureMySqlEntity>,
        private readonly assetsManagerService: AssetsManagerService,
        private readonly mpegDashConverterService: MpegDashConverterService,
    ) { }

    @GrpcMethod("CourseService", "createCourse")
    async createCourse(input: CreateCourseInput): Promise<MessageResponse> {
        const { description, price, title } = input.data
        const promises: Array<Promise<void>> = []

        let thumbnailId: string
        const thumbnail = input.files.at(0)
        const uploadThumbnailPromise = async () => {
            const { assetId } = await this.assetsManagerService.upload(thumbnail)
            thumbnailId = assetId
        }
        promises.push(uploadThumbnailPromise())

        let previewVideoId: string
        const previewVideo = input.files.at(1)
        const uploadPreviewVideoPromise = async () => {
            const { assetId } = await this.assetsManagerService.upload(previewVideo)
            previewVideoId = assetId
        }
        promises.push(uploadPreviewVideoPromise())

        await Promise.all(promises)

        const created = await this.courseMySqlRepository.save({
            creatorId: input.userId,
            description,
            price,
            title,
            thumbnailId,
            previewVideoId,
        })

        if (created)
            return {
                message: `A course with id ${created.courseId} has been creeated successfully.`,
            }
    }

    @GrpcMethod("CourseService", "createSection")
    async createSection(input: CreateSectionInput): Promise<MessageResponse> {
        const { courseId, title } = input.data
        const course = await this.courseMySqlRepository.findOneBy({
            courseId
        })
        if (!course) throw new GrpcNotFoundException("Course not found.")
        const created = await this.sectionMySqlRepository.save({
            courseId,
            title
        })
        if (created)
            return {
                message: `A section with id ${created.sectionId} has been creeated successfully.`,
            }
    }

    @GrpcMethod("CourseService", "createLecture")
    async createLecture(input: CreateLectureInput): Promise<MessageResponse> {
        const { title, sectionId } = input.data
        const promises: Array<Promise<void>> = []

        let videoId: string
        const video = input.files.at(0)
        const uploadVideoPromise = async () => {
            const { assetId } = await this.mpegDashConverterService.convert(video)
            videoId = assetId
        }
        promises.push(uploadVideoPromise())

        await Promise.all(promises)

        const created = await this.lectureMySqlRepository.save({
            videoId,
            title,
            sectionId
        })

        if (created)
            return {
                message: `A lecture with id ${created.lectureId} has been creeated successfully.`,
            }
    }
}
