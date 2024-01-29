import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { MicroserviceOptions, Transport } from "@nestjs/microservices"
import { join } from "path"

const bootstrap = async () => {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        AppModule,
        {
            transport: Transport.GRPC,
            options: {
                package: ["auth"],
                protoPath: [
                    join(
                        process.cwd(),
                        "protos",
                        "services",
                        "auth",
                        "auth.service.proto",
                    ),
                    join(
                        process.cwd(),
                        "protos",
                        "services",
                        "course",
                        "course.service.proto",
                    ),
                ],
            }
        }
    )
    await app.listen()
}
bootstrap()