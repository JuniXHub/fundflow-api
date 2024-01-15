import { UserCreateInput } from '@app/@generated/user/user-create.input'
import { UserUpdateInput } from '@app/@generated/user/user-update.input'
import { PrismaService } from '@app/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { email } })
  }

  async create(data: UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data })
  }

  async update(data: UserUpdateInput, id: number): Promise<User> {
    return this.prisma.user.update({ data, where: { id } })
  }
}
