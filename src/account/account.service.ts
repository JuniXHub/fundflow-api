import { AccountCreateWithoutWorkspaceInput } from '@app/@generated/account/account-create-without-workspace.input'
import { AccountModel } from '@app/common'
import { CurrencyService } from '@app/currency/currency.service'
import { PrismaService } from '@app/prisma/prisma.service'
import { BadRequestException, Injectable } from '@nestjs/common'
import { Currency } from '@prisma/client'

@Injectable()
export class AccountService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly currencyService: CurrencyService,
  ) {}

  public async get(id: number): Promise<AccountModel> {
    return this.prisma.account.findUnique({ where: { id } })
  }

  public async getAll(workspaceId): Promise<AccountModel[]> {
    return this.prisma.account.findMany({ where: workspaceId })
  }

  public async create(
    data: AccountCreateWithoutWorkspaceInput,
    workspaceId: number,
  ): Promise<AccountModel> {
    await this.checkCurrency(data.currencyCode)

    return this.prisma.account.create({
      data: {
        ...data,
        workspace: {
          connect: { id: workspaceId },
        },
      },
    })
  }

  public async update(
    data: AccountCreateWithoutWorkspaceInput,
    id: number,
    workspaceId: number,
  ): Promise<AccountModel> {
    await this.checkCurrency(data.currencyCode)

    return this.prisma.account.update({
      data: { ...data, workspace: { connect: { id: workspaceId } } },
      where: { id },
    })
  }

  public async delete(id, workspaceId): Promise<AccountModel> {
    return this.prisma.account.delete({ where: { id, workspaceId } })
  }

  private async checkCurrency(num: number): Promise<Currency> {
    const currency = await this.currencyService.getByNum(num)

    if (!currency) {
      throw new BadRequestException("Requested Currency doesn't supported")
    }

    return currency
  }
}
