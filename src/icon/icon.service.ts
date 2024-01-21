import { PrismaService } from '@app/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { Icon } from '@prisma/client'

@Injectable()
export class IconService {
  constructor(private readonly prisma: PrismaService) {}

  public async getAll(): Promise<Icon[]> {
    return this.prisma.icon.findMany()
  }
}
