import { Module } from '@nestjs/common'
import { PrismaModule } from '@app/prisma/prisma.module'
import { CurrencyModule } from '@app/currency/currency.module'
import { APP_GUARD } from '@nestjs/core'
import { RoleGuard } from '@app/common'
import { RoleModule } from '@app/role/role.module'
import { AccountService } from './account.service'
import { AccountResolver } from './account.resolver'

@Module({
  imports: [PrismaModule, CurrencyModule, RoleModule],
  providers: [AccountService, AccountResolver, { provide: APP_GUARD, useClass: RoleGuard }],
  exports: [AccountService],
})
export class AccountModule {}
