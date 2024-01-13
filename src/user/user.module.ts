import { Module } from '@nestjs/common'
import { PrismaModule } from '@app/prisma/prisma.module'
import { UserService } from './user.service'

@Module({
  providers: [UserService, PrismaModule],
  exports: [UserService],
})
export class UserModule {}
