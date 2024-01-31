import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import {
    databaseConfig,
    jwtConfig,
    servicesConfig,
    thirdPartyConfig,
} from "@config"
import { GlobalModule } from "@global"
import { FeaturesModule } from "@features"
import { APP_FILTER } from "@nestjs/core"
import { GrpcServerExceptionFilter } from "nestjs-grpc-exceptions"

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [databaseConfig, jwtConfig, thirdPartyConfig, servicesConfig],
        }),

        TypeOrmModule.forRoot({
            type: "mysql",
            host: databaseConfig().mysql.host,
            port: +databaseConfig().mysql.port,
            username: databaseConfig().mysql.username,
            password: databaseConfig().mysql.password,
            database: databaseConfig().mysql.schema,
            autoLoadEntities: true,
            synchronize: true,
        }),

        GlobalModule,
        FeaturesModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_FILTER,
            useClass: GrpcServerExceptionFilter,
        },
    ],
})
export class AppModule {}
