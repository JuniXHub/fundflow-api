import { Module } from '@nestjs/common'
import { PrismaModule } from '@app/prisma/prisma.module'
import { WorkspaceService } from './workspace.service'
import { WorkspaceResolver } from './workspace.resolver'

@Module({
  imports: [PrismaModule],
  providers: [WorkspaceService, WorkspaceResolver],
})
export class WorkspaceModule {}
