import { Global, Module } from "@nestjs/common"
import {
    AssetsManagerService,
    FirebaseService,
    MailerService,
    MpegDashConverterService,
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
        MpegDashConverterService
    ],
    providers: [
        AssetsManagerService,
        FirebaseService,
        MailerService,
        Sha256Service,
        JwtService,
        MpegDashConverterService
    ],
})
export default class GlobalModule {}
