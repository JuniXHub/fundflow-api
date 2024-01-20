import { Module } from '@nestjs/common'
import { PrismaModule } from '@app/prisma/prisma.module'
import { APP_GUARD } from '@nestjs/core'
import { RoleGuard } from '@app/common'
import { RoleModule } from '@app/role/role.module'
import { WorkspaceService } from './workspace.service'
import { WorkspaceResolver } from './workspace.resolver'

@Module({
  imports: [PrismaModule, RoleModule],
  providers: [WorkspaceService, WorkspaceResolver, { provide: APP_GUARD, useClass: RoleGuard }],
})
export class WorkspaceModule {}
