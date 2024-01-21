import { Module } from '@nestjs/common'
import { PrismaModule } from '@app/prisma/prisma.module'
import { IconService } from './icon.service'
import { IconResolver } from './icon.resolver'

@Module({
  imports: [PrismaModule],
  providers: [IconService, IconResolver],
  exports: [IconService],
})
export class IconModule {}
