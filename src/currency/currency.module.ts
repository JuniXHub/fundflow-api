import { Module } from '@nestjs/common'
import { PrismaModule } from '@app/prisma/prisma.module'
import { CurrencyService } from './currency.service'
import { CurrencyResolver } from './currency.resolver'

@Module({
  imports: [PrismaModule],
  providers: [CurrencyService, CurrencyResolver],
})
export class CurrencyModule {}
