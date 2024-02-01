import { Controller } from "@nestjs/common"
import { GrpcMethod } from "@nestjs/microservices"
import { UserMySqlEntity } from "@database"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { MailerService, Sha256Service } from "@global"
import { SignInRequestBody, SignUpRequestBody } from "./shared"
import {
    GrpcAlreadyExistsException,
    GrpcUnauthenticatedException,
    GrpcUnavailableException,
} from "nestjs-grpc-exceptions"

@Controller()
export default class AuthService {
    constructor(
    @InjectRepository(UserMySqlEntity)
    private readonly userMySqlRepository: Repository<UserMySqlEntity>,
    private readonly sha256Service: Sha256Service,
    private readonly mailerService: MailerService,
    ) {}

  @GrpcMethod("AuthService", "signIn")
    async signIn(body: SignInRequestBody): Promise<UserMySqlEntity> {
        const found = await this.userMySqlRepository.findOneBy({
            email: body.email,
        })
        if (!found) throw new GrpcUnavailableException("User not found.")
        if (!this.sha256Service.verifyHash(body.password, found.password))
            throw new GrpcUnauthenticatedException("Invalid credentials.")
        return found
    }

  @GrpcMethod("AuthService", "signUp")
  async signUp(body: SignUpRequestBody): Promise<string> {
      const found = await this.userMySqlRepository.findOne({
          where: {
              email: body.email,
          },
      })
      if (found) {
          throw new GrpcAlreadyExistsException(
              `User with email ${body.email} has existed.`,
          )
      }
      body.password = this.sha256Service.createHash(body.password)
      const created = await this.userMySqlRepository.save(body)

      await this.mailerService.sendMail(created.userId, body.email)
      return `An user with id ${created.userId} has been created`
  }
}
