import { CourseResolvers, PostResolvers } from "@features"
import { NestFactory } from "@nestjs/core"
import {
    GraphQLSchemaBuilderModule,
    GraphQLSchemaFactory,
} from "@nestjs/graphql"
import { promises as fsPromises } from "fs"
import { printSchema } from "graphql"
import { join } from "path"

const generateSchema = async () => {
    const app = await NestFactory.create(GraphQLSchemaBuilderModule)
    await app.init()

    const gqlSchemaFactory = app.get(GraphQLSchemaFactory)
    const schema = await gqlSchemaFactory.create([
        CourseResolvers,
        PostResolvers,
    ])
    await fsPromises.writeFile(
        join(
            process.cwd(),
            `${process.env.NODE_ENV === "production" ? "dist" : "src"}/schema.gql`,
        ),
        printSchema(schema),
    )
}

export default generateSchema
