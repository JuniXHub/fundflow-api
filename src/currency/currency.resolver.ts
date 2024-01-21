import { Query, Resolver } from '@nestjs/graphql'
import { Currency } from '@app/@generated/currency/currency.model'
import { Public } from '@app/common'
import { CurrencyService } from './currency.service'

@Resolver()
export class CurrencyResolver {
  constructor(private readonly currencyService: CurrencyService) {}

  @Query(() => [Currency])
  @Public()
  public async getSupportedCurrencies(): Promise<Currency[]> {
    return this.currencyService.getAll()
  }
}
