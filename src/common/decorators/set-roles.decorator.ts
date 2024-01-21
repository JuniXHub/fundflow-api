import { SetMetadata } from '@nestjs/common'
import { WorkspaceRoles } from '@prisma/client'
import { ROLES_KEY } from '@app/common'

export const SetRoles = (...args: WorkspaceRoles[]) => SetMetadata(ROLES_KEY, args)
