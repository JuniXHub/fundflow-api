import { WorkspaceRoles } from '@prisma/client'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CurrentUser, SetRoles, WorkspaceModel } from '@app/common'
import { WorkspaceService } from './workspace.service'

@Resolver()
export class WorkspaceResolver {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Mutation(() => WorkspaceModel)
  public async createWorkspace(
    @Args('name') name: string,
    @CurrentUser('sub') userId: number,
  ): Promise<WorkspaceModel> {
    return this.workspaceService.create(name, userId)
  }

  @SetRoles(WorkspaceRoles.OWNER)
  @Mutation(() => WorkspaceModel)
  public async deleteWorkspace(@Args('workspaceId') id: number): Promise<WorkspaceModel> {
    return this.workspaceService.delete(id)
  }

  @Query(() => [WorkspaceModel])
  public async getAvailableWorkspaces(
    @CurrentUser('sub') userId: number,
  ): Promise<WorkspaceModel[]> {
    return this.workspaceService.getAll(userId)
  }
}
