import { CurrentUser, JwtPayload, Public, RefreshTokenGuard, ResponseMessage } from '@app/common'
import { UseGuards } from '@nestjs/common'
import { Context, Mutation, Resolver } from '@nestjs/graphql'
import { Response } from 'express'
import { AuthService } from './auth.service'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => ResponseMessage)
  public logout(@Context('res') res: Response): ResponseMessage {
    res.clearCookie('access_token')
    res.clearCookie('refresh_token')

    return { message: 'Success' }
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Mutation(() => ResponseMessage)
  public async revokeAccessToken(
    @Context('res') res: Response,
    @CurrentUser() { id, email }: JwtPayload,
  ): Promise<ResponseMessage> {
    const accessToken = await this.authService.generateToken(id, email)

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      maxAge: 10 * 60 * 1000,
    }) // Cookie valid for 10 minutes

    return { message: 'Success' }
  }
}
