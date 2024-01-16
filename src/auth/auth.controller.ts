import { Controller, Get, HttpStatus, Res, UseGuards } from '@nestjs/common'
import { Response } from 'express'
import {
  CurrentUser,
  EnvironmentVariables,
  GoogleOauthGuard,
  Public,
  UserPayload,
} from '@app/common'
import { ConfigService } from '@nestjs/config'
import { AuthService } from './auth.service'

@Controller('auth')
@Public()
export class AuthController {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
    private readonly authService: AuthService,
  ) {}

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async auth(@Res() res: Response): Promise<void> {
    res.status(HttpStatus.OK)
  }

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@CurrentUser() data: UserPayload, @Res() res: Response): Promise<void> {
    const { accessToken, refreshToken } = await this.authService.oAuthSignIn(data)

    res.cookie('access_token', accessToken, {
      secure: true,
      httpOnly: true,
      maxAge: 10 * 60 * 1000,
    }) // Cookie valid for 10 minutes

    res.cookie('refresh_token', refreshToken, {
      secure: true,
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    }) // Cookie valid for 7 days

    res.redirect(this.configService.get<string>('CLIENT_URL'))
  }
}
