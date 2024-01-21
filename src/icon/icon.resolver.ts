import { Query, Resolver } from '@nestjs/graphql'
import { Icon } from '@app/@generated/icon/icon.model'
import { IconService } from './icon.service'

@Resolver()
export class IconResolver {
  constructor(private readonly iconService: IconService) {}

  @Query(() => [Icon])
  public async getCategoryIcons(): Promise<Icon[]> {
    return this.iconService.getAll()
  }
}
