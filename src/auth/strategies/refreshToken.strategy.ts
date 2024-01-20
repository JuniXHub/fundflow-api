import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Request } from 'express'
import { EnvironmentVariables, JwtPayload } from '@app/common'
import { ConfigService } from '@nestjs/config'
import { Inject } from '@nestjs/common'

export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    @Inject(ConfigService)
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      passReqToCallback: true,
      secretOrKey: process.env.JWT_REFRESH_SECRET,
    })
  }

  validate(req: Request, payload: JwtPayload) {
    const refreshToken = req.get('Authorization').split(' ')[1]
    return {
      ...payload,
      refreshToken,
    }
  }
}
