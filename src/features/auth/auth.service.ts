import { Controller, UnauthorizedException } from "@nestjs/common"
import { GrpcMethod } from "@nestjs/microservices"
import { UserMySqlEntity } from "@database"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { FirebaseService, MailerService, Sha256Service } from "@global"
import { InitInput, SignInInput, SignUpInput, VerifyGoogleAccessTokenInput } from "./shared"
import {
    GrpcAlreadyExistsException,
    GrpcUnauthenticatedException,
    GrpcUnavailableException,
} from "nestjs-grpc-exceptions"
import { MessageResponse, UserKind } from "@common"

@Controller()
export default class AuthService {
    constructor(
    @InjectRepository(UserMySqlEntity)
    private readonly userMySqlRepository: Repository<UserMySqlEntity>,
    private readonly sha256Service: Sha256Service,
    private readonly mailerService: MailerService,
    private readonly firebaseService: FirebaseService
    ) {}

  @GrpcMethod("AuthService", "signIn")
    async signIn(input: SignInInput): Promise<UserMySqlEntity> {
        const found = await this.userMySqlRepository.findOneBy({
            email: input.email,
        })
        if (!found) throw new GrpcUnavailableException("User not found.")
        if (!this.sha256Service.verifyHash(input.password, found.password))
            throw new GrpcUnauthenticatedException("Invalid credentials.")
        return found
    }

  @GrpcMethod("AuthService", "signUp")
  async signUp(input: SignUpInput): Promise<MessageResponse> {
      const found = await this.userMySqlRepository.findOne({
          where: {
              email: input.email,
          },
      })
      if (found) {
          throw new GrpcAlreadyExistsException(
              `User with email ${input.email} has existed.`,
          )
      }
      input.password = this.sha256Service.createHash(input.password)
      const created = await this.userMySqlRepository.save(input)

      await this.mailerService.sendMail(created.userId, input.email)
      return {
          message: `An user with id ${created.userId} has been created`,
      }
  }

  
  @GrpcMethod("AuthService", "init")
  async init(input: InitInput): Promise<UserMySqlEntity> {
      return await this.userMySqlRepository.findOneBy({
          userId: input.userId,
      })
  }

  @GrpcMethod("AuthService", "verifyGoogleAccessToken")
  async verifyGoogleAccessToken(input: VerifyGoogleAccessTokenInput): Promise<UserMySqlEntity> {
      const decoded = await this.firebaseService.verifyGoogleAccessToken(input.token)
      if (!decoded)
          throw new UnauthorizedException("Invalid Google access token.")
      let found = await this.userMySqlRepository.findOneBy({
          externalId: decoded.uid,
      })
      if (!found) {
          found = await this.userMySqlRepository.save({
              externalId: decoded.uid,
              email: decoded.email,
              avatarUrl: decoded.picture,
              phoneNumber: decoded.phone_number,
              kind: UserKind.Google,
          })
      }
      return found
  }
}
