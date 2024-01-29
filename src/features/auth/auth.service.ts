import { Controller, NotFoundException, UnauthorizedException } from "@nestjs/common"
import { GrpcMethod } from "@nestjs/microservices"
import { SignInInput } from "./interfaces"
import { UserMySqlEntity } from "@database"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Sha256Service } from "@global"

@Controller()
export default class AuthService  {
    constructor(
        @InjectRepository(UserMySqlEntity)
        private readonly userMySqlRepository: Repository<UserMySqlEntity>,
        private readonly sha256Service: Sha256Service
    ){}

    @GrpcMethod("AuthService", "SignIn")
    async signIn(data: SignInInput): Promise<UserMySqlEntity> {
        const found = await this.userMySqlRepository.findOneBy({
            email: data.email,
        })
        if (!found) throw new NotFoundException("User not found.")
        if (!this.sha256Service.verifyHash(data.password, found.password))
            throw new UnauthorizedException("Invalid credentials.")
        return found
    }
}