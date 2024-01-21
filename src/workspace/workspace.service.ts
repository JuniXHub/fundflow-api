import { WorkspaceUpdateWithoutRolesInput } from '@app/@generated/workspace/workspace-update-without-roles.input'
import { WorkspaceModel, defaultCategories } from '@app/common'
import { PrismaService } from '@app/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { WorkspaceRoles } from '@prisma/client'

@Injectable()
export class WorkspaceService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(name: string, userId: number): Promise<WorkspaceModel> {
    return this.prisma.workspace.create({
      data: {
        name,
        roles: {
          create: {
            userId,
            type: WorkspaceRoles.OWNER,
          },
        },
        categories: {
          createMany: {
            data: defaultCategories,
          },
        },
      },
      include: {
        roles: true,
        categories: {
          include: {
            icon: true,
          },
        },
      },
    })
  }

  public async update(data: WorkspaceUpdateWithoutRolesInput, id: number): Promise<WorkspaceModel> {
    return this.prisma.workspace.update({ data, where: { id } })
  }

  public async delete(id: number): Promise<WorkspaceModel> {
    return this.prisma.workspace.delete({ where: { id } })
  }

  public async getAll(userId: number): Promise<WorkspaceModel[]> {
    return this.prisma.workspace.findMany({ where: { roles: { some: { userId } } } })
  }
}
