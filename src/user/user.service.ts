import { UserCreateWithoutRolesInput } from '@app/@generated/user/user-create-without-roles.input'
import { UserUpdateWithoutRolesInput } from '@app/@generated/user/user-update-without-roles.input'
import { User } from '@app/@generated/user/user.model'
import { PrismaService } from '@app/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  public async findByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { email } })
  }

  public async findById(id: number): Promise<User> {
    return this.prisma.user.findUnique({ where: { id } })
  }

  public async create(data: UserCreateWithoutRolesInput): Promise<User> {
    return this.prisma.user.create({ data })
  }

  public async update(data: UserUpdateWithoutRolesInput, id: number): Promise<User> {
    return this.prisma.user.update({ data, where: { id } })
  }
}
