import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { AccountModel, SetRoles } from '@app/common'
import { WorkspaceRoles } from '@prisma/client'
import { AccountCreateWithoutWorkspaceInput } from '@app/@generated/account/account-create-without-workspace.input'
import { AccountService } from './account.service'

@Resolver()
export class AccountResolver {
  constructor(private readonly accountService: AccountService) {}

  @Mutation(() => AccountModel)
  @SetRoles(WorkspaceRoles.EDITOR, WorkspaceRoles.OWNER)
  public async createAccount(
    @Args('accountCreateInput') data: AccountCreateWithoutWorkspaceInput,
    @Args('workspaceId', { type: () => Int }) workspaceId: number,
  ): Promise<AccountModel> {
    return this.accountService.create(data, workspaceId)
  }

  @Mutation(() => AccountModel)
  @SetRoles(WorkspaceRoles.EDITOR, WorkspaceRoles.OWNER)
  public async updateAccount(
    @Args('accountUpdateInput') data: AccountCreateWithoutWorkspaceInput,
    @Args('accountId', { type: () => Int }) accountId: number,
    @Args('workspaceId', { type: () => Int }) workspaceId: number,
  ): Promise<AccountModel> {
    return this.accountService.update(data, accountId, workspaceId)
  }

  @Mutation(() => AccountModel)
  @SetRoles(WorkspaceRoles.EDITOR, WorkspaceRoles.OWNER)
  public async deleteAccount(
    @Args('accountId', { type: () => Int }) id: number,
    @Args('workspaceId', { type: () => Int }) workspaceId: number,
  ): Promise<AccountModel> {
    return this.accountService.delete(id, workspaceId)
  }

  @Query(() => AccountModel)
  @SetRoles(WorkspaceRoles.EDITOR, WorkspaceRoles.OWNER, WorkspaceRoles.VIEWER)
  public async getAccount(
    @Args('accountId', { type: () => Int }) id: number,
  ): Promise<AccountModel> {
    return this.accountService.get(id)
  }

  @Query(() => AccountModel)
  @SetRoles(WorkspaceRoles.EDITOR, WorkspaceRoles.OWNER, WorkspaceRoles.VIEWER)
  public async getWorkspaceAccounts(@Args('workspaceId', { type: () => Int }) workspaceId: number) {
    return this.accountService.getAll(workspaceId)
  }
}
