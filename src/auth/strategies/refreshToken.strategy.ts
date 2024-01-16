import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Request } from 'express'
import { EnvironmentVariables, UserPayload } from '@app/common'
import { ConfigService } from '@nestjs/config'

export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private readonly configService: ConfigService<EnvironmentVariables>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      passReqToCallback: true,
      secretOrKey: process.env.JWT_REFRESH_SECRET,
    })
  }

  validate(req: Request, payload: UserPayload) {
    const refreshToken = req.get('Authorization').split(' ')[1]
    return {
      ...payload,
      refreshToken,
    }
  }
}
