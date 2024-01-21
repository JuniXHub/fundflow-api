import { Module } from '@nestjs/common'
import { PrismaModule } from '@app/prisma/prisma.module'
import { RoleGuard } from '@app/common'
import { APP_GUARD } from '@nestjs/core'
import { RoleModule } from '@app/role/role.module'
import { CategoryService } from './category.service'
import { CategoryResolver } from './category.resolver'

@Module({
  imports: [PrismaModule, RoleModule],
  providers: [CategoryService, CategoryResolver, { provide: APP_GUARD, useClass: RoleGuard }],
})
export class CategoryModule {}
