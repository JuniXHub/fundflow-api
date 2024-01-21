import { Workspace } from '@app/@generated/workspace/workspace.model'
import { Field, ObjectType, OmitType } from '@nestjs/graphql'
import { AccountModel } from './account.schema'

@ObjectType()
export class WorkspaceModel extends OmitType(Workspace, ['_count', 'roles', 'accounts']) {
  @Field(() => [AccountModel], { nullable: true })
  accounts?: AccountModel[]
}
