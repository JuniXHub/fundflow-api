import { Module } from '@nestjs/common'
import { PrismaModule } from '@app/prisma/prisma.module'
import { RoleResolver } from './role.resolver'
import { RoleService } from './role.service'

@Module({
  imports: [PrismaModule],
  providers: [RoleResolver, RoleService],
  exports: [RoleService],
})
export class RoleModule {}
