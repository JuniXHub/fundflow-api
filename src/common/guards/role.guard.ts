import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ROLES_KEY } from '@app/common'
import { RoleService } from '@app/role/role.service'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Roles } from '@prisma/client'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly roleService: RoleService,
  ) {}

  private matchRoles(roles: Roles[], userRole: Roles) {
    return roles.some((role) => role === userRole)
  }

  public async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const context = GqlExecutionContext.create(ctx)
    const roles = this.reflector.get<Roles[]>(ROLES_KEY, context.getHandler())

    if (!roles) {
      return true
    }

    const { req } = context.getContext()
    const userId = req.user.sub
    const { workspaceId } = context.getArgs()

    if (!userId || !workspaceId) {
      return false
    }

    const role = await this.roleService.get(userId, workspaceId)

    return this.matchRoles(roles, role.type)
  }
}
