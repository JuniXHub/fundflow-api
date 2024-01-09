import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from './auth.service'
import { GoogleStrategy } from './strategies/google.strategy'
import { AuthController } from './auth.controller'

@Module({
  imports: [PassportModule, JwtModule.register({})],
  providers: [AuthService, GoogleStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
