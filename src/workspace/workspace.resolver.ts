import { Roles } from '@prisma/client'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { CurrentUser, SetRoles } from '@app/common'
import { Workspace } from '@app/@generated/workspace/workspace.model'
import { WorkspaceService } from './workspace.service'

@Resolver()
export class WorkspaceResolver {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Mutation(() => Workspace)
  public async createWorkspace(
    @Args('name') name: string,
    @CurrentUser('sub') userId: number,
  ): Promise<Workspace> {
    return this.workspaceService.create(name, userId)
  }

  @SetRoles(Roles.OWNER)
  @Mutation(() => Workspace)
  public async deleteWorkspace(@Args('workspaceId') id: number): Promise<Workspace> {
    return this.workspaceService.delete(id)
  }
}
