import { RoleCreateInput } from '@app/@generated/role/role-create.input'
import { RoleUpdateInput } from '@app/@generated/role/role-update.input'
import { Role } from '@app/@generated/role/role.model'
import { PrismaService } from '@app/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(data: RoleCreateInput): Promise<Role> {
    return this.prisma.role.create({ data })
  }

  public async update(data: RoleUpdateInput, id: number): Promise<Role> {
    return this.prisma.role.update({ data, where: { id } })
  }
}
