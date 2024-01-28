import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { GqlExecutionContext } from "@nestjs/graphql"
import { ValidatedResult } from "../interfaces"

export const User = createParamDecorator(
    (_, context: ExecutionContext) => {
        const ctx = GqlExecutionContext.create(context)
        const { user } = ctx.getContext().req.user as ValidatedResult
        return user
    },
)
