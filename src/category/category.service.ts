import { CategoryCreateInput } from '@app/@generated/category/category-create.input'
import { CategoryUpdateInput } from '@app/@generated/category/category-update.input'
import { CategoryModel } from '@app/common'
import { PrismaService } from '@app/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { CreateCategoryDto, UpdateCategoryDto } from './dto'

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  public async create({
    name,
    parentId,
    workspaceId,
    iconId,
  }: CreateCategoryDto): Promise<CategoryModel> {
    const data: CategoryCreateInput = {
      name,
      icon: { connect: { id: iconId } },
      workspace: { connect: { id: workspaceId } },
    }

    data.parent = parentId ? { connect: { id: parentId } } : undefined

    return this.prisma.category.create({
      data,
    })
  }

  public async delete(id: number, workspaceId): Promise<CategoryModel> {
    return this.prisma.category.delete({ where: { id, workspaceId } })
  }

  public async update({
    name,
    parentId,
    workspaceId,
    iconId,
    categoryId,
  }: UpdateCategoryDto): Promise<CategoryModel> {
    const data: CategoryUpdateInput = {}

    data.name = name ? { set: name } : undefined
    data.icon = iconId ? { connect: { id: iconId } } : undefined
    data.parent = parentId ? { connect: { id: parentId } } : undefined

    return this.prisma.category.update({
      data,
      where: { id: categoryId, workspaceId },
    })
  }

  public async getAll(workspaceId): Promise<CategoryModel[]> {
    return this.prisma.category.findMany({
      where: { workspaceId },
      include: { icon: true, parent: true, childrens: true },
    })
  }
}
