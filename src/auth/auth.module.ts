import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { UserModule } from '@app/user/user.module'
import { ConfigModule } from '@nestjs/config'
import { AuthService } from './auth.service'
import { AccessTokenStrategy, GoogleStrategy, RefreshTokenStrategy } from './strategies'
import { AuthController } from './auth.controller'

@Module({
  imports: [PassportModule, ConfigModule, JwtModule.register({}), UserModule],
  providers: [AuthService, GoogleStrategy, AccessTokenStrategy, RefreshTokenStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
