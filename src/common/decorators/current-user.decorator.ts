import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { ExpressRequest, UserPayload } from '@app/common'

export const CurrentUser = createParamDecorator(
  (data: string, ctx: ExecutionContext): UserPayload | null => {
    const context = GqlExecutionContext.create(ctx)
    const request: ExpressRequest = context.getContext().req

    if (!request.user) {
      return null
    }

    if (data) {
      return request.user[data]
    }

    return request.user
  },
)
