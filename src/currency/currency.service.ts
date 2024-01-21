import { Currency } from '@app/@generated/currency/currency.model'
import { PrismaService } from '@app/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CurrencyService {
  constructor(private readonly prisma: PrismaService) {}

  public async getAll(): Promise<Currency[]> {
    return this.prisma.currency.findMany()
  }

  public async getByNum(num: number): Promise<Currency> {
    return this.prisma.currency.findUnique({ where: { num } })
  }

  public async getByCode(code: string): Promise<Currency> {
    return this.prisma.currency.findUnique({ where: { code } })
  }
}
