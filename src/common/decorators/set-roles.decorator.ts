import { SetMetadata } from '@nestjs/common'
import { Roles } from '@prisma/client'
import { ROLES_KEY } from '@app/common'

export const SetRoles = (...args: Roles[]) => SetMetadata(ROLES_KEY, args)
