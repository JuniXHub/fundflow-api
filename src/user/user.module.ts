import { Module } from '@nestjs/common'
import { PrismaModule } from '@app/prisma/prisma.module'
import { UserService } from './user.service'
import { UserResolver } from './user.resolver'

@Module({
  imports: [PrismaModule],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
