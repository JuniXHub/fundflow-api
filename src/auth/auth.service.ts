import { JwtService } from '@nestjs/jwt'
import { Injectable } from '@nestjs/common'
import { EnvironmentVariables, Tokens, ProviderPayload } from '@app/common'
import { UserService } from '@app/user/user.service'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<EnvironmentVariables>,
    private readonly userService: UserService,
  ) {}

  async oAuthSignIn(data: ProviderPayload): Promise<Tokens> {
    const user = await this.userService.findByEmail(data.email)

    if (!user) {
      return this.oAuthSignUp(data)
    }

    return this.generateTokens(user.id, user.email)
  }

  private async oAuthSignUp(data: ProviderPayload): Promise<Tokens> {
    const user = await this.userService.create(data)
    return this.generateTokens(user.id, user.email)
  }

  private async generateTokens(sub, email): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.generateToken(sub, email),
      this.generateToken(sub, email, '7d', this.configService.get<string>('JWT_REFRESH_SECRET')),
    ])

    return { accessToken, refreshToken }
  }

  async generateToken(
    sub: number,
    email: string,
    expiresIn?: string | number,
    secret?: string,
  ): Promise<string> {
    return this.jwtService.signAsync(
      {
        sub,
        email,
      },
      {
        secret: secret || this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: expiresIn || '10m',
      },
    )
  }
}
