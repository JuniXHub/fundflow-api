import { Query, Resolver } from '@nestjs/graphql'
import { User } from '@app/@generated/user/user.model'
import { CurrentUser } from '@app/common'
import { UserService } from './user.service'

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  public async getCurrentUser(@CurrentUser('sub') id: number): Promise<User> {
    return this.userService.findById(id)
  }
}
