import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CategoryModel, SetRoles } from '@app/common'
import { WorkspaceRoles } from '@prisma/client'
import { CategoryService } from './category.service'

@Resolver()
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => CategoryModel)
  @SetRoles(WorkspaceRoles.OWNER, WorkspaceRoles.EDITOR)
  public async createCategory(
    @Args('name') name: string,
    @Args('iconId', { type: () => Int }) iconId: number,
    @Args('workspaceId', { type: () => Int }) workspaceId: number,
    @Args('parentId', { type: () => Int, nullable: true }) parentId?: number,
  ): Promise<CategoryModel> {
    return this.categoryService.create({ name, iconId, workspaceId, parentId })
  }

  @Mutation(() => CategoryModel)
  @SetRoles(WorkspaceRoles.OWNER, WorkspaceRoles.EDITOR)
  public async updateCategory(
    @Args('name', { nullable: true }) name: string,
    @Args('categoryId', { type: () => Int }) categoryId: number,
    @Args('workspaceId', { type: () => Int }) workspaceId: number,
    @Args('iconId', { type: () => Int, nullable: true }) iconId: number,
    @Args('parentId', { type: () => Int, nullable: true }) parentId?: number,
  ): Promise<CategoryModel> {
    return this.categoryService.update({ name, iconId, workspaceId, parentId, categoryId })
  }

  @Mutation(() => CategoryModel)
  @SetRoles(WorkspaceRoles.OWNER, WorkspaceRoles.EDITOR)
  public async deleteCategory(
    @Args('categoryId', { type: () => Int }) categoryId: number,
    @Args('workspaceId', { type: () => Int }) workspaceId: number,
  ): Promise<CategoryModel> {
    return this.categoryService.delete(categoryId, workspaceId)
  }

  @Query(() => [CategoryModel])
  @SetRoles(WorkspaceRoles.OWNER, WorkspaceRoles.EDITOR, WorkspaceRoles.VIEWER)
  public async getCategories(
    @Args('workspaceId', { type: () => Int }) workspaceId: number,
  ): Promise<CategoryModel[]> {
    return this.categoryService.getAll(workspaceId)
  }
}
