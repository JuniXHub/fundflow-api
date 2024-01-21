import { Query, Resolver } from '@nestjs/graphql'
import { IconModel } from '@app/common'
import { IconService } from './icon.service'

@Resolver()
export class IconResolver {
  constructor(private readonly iconService: IconService) {}

  @Query(() => [IconModel])
  public async getCategoryIcons(): Promise<IconModel[]> {
    return this.iconService.getAll()
  }
}
