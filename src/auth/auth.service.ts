import { JwtService } from '@nestjs/jwt'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateJwt(payload): Promise<string> {
    return this.jwtService.signAsync(payload)
  }
}
