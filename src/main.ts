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
                url: "0.0.0.0:3002",
                maxReceiveMessageLength: 1024 * 1024 * 1024 * 5,
                package: ["auth", "course"],
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
            },
        },
    )
    await app.listen()
}  
bootstrap()        