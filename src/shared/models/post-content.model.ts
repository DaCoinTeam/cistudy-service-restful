import { ContentType } from "@database"
import { Field, ID, Int, ObjectType } from "@nestjs/graphql"

@ObjectType()
export default class PostContentModel {
  @Field(() => ID)
      postContentId: string

  @Field(() => Int)
  	index: number

  @Field(() => String)
  	content: string

  @Field(() => ContentType)
  	contentType: ContentType

  @Field(() => String)
  	postId: string
}
