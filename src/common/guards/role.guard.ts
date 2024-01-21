import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ROLES_KEY } from '@app/common'
import { RoleService } from '@app/role/role.service'
import { GqlExecutionContext } from '@nestjs/graphql'
import { WorkspaceRoles } from '@prisma/client'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly roleService: RoleService,
  ) {}

  private matchRoles(roles: WorkspaceRoles[], userRole: WorkspaceRoles) {
    return roles.some((role) => role === userRole)
  }

  public async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const context = GqlExecutionContext.create(ctx)
    const roles = this.reflector.get<WorkspaceRoles[]>(ROLES_KEY, context.getHandler())

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

    if (!role) {
      return false
    }

    return this.matchRoles(roles, role.type)
  }
}
