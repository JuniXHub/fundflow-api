import { IconModel } from '@app/common'
import { PrismaService } from '@app/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class IconService {
  constructor(private readonly prisma: PrismaService) {}

  public async getAll(): Promise<IconModel[]> {
    return this.prisma.icon.findMany()
  }
}
