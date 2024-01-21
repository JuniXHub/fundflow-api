import { Workspace } from '@app/@generated/workspace/workspace.model'
import { Field, ObjectType, OmitType } from '@nestjs/graphql'
import { AccountModel } from './account.schema'
import { CategoryModel } from './category.schema'

@ObjectType()
export class WorkspaceModel extends OmitType(Workspace, [
  '_count',
  'roles',
  'accounts',
  'categories',
]) {
  @Field(() => [AccountModel], { nullable: true })
  accounts?: AccountModel[]

  @Field(() => [CategoryModel], { nullable: true })
  categories?: CategoryModel[]
}
