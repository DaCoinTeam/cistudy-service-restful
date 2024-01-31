import { Global, Module } from "@nestjs/common"
import {
    AssetsManagerService,
    FirebaseService,
    MailerService,
    Sha256Service,
} from "./services"
import { JwtService } from "@nestjs/jwt"
import { SessionMySqlEntity } from "@database"
import { TypeOrmModule } from "@nestjs/typeorm"

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([SessionMySqlEntity])],
    exports: [
        AssetsManagerService,
        FirebaseService,
        MailerService,
        Sha256Service,
        JwtService,
    ],
    providers: [
        AssetsManagerService,
        FirebaseService,
        MailerService,
        Sha256Service,
        JwtService,
    ],
})
export default class GlobalModule {}
