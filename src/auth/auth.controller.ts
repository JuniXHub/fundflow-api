import { Controller, Get, HttpStatus, Res, UseGuards } from '@nestjs/common'
import { Response } from 'express'
import { GoogleOauthGuard } from '@app/common'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async auth() {
    return HttpStatus.OK
  }

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Res() res: Response) {
    return res.json({ msg: 'success' })
  }
}
