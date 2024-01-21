import { Category } from '@app/@generated/category/category.model'
import { Field, ObjectType, OmitType } from '@nestjs/graphql'
import { IconModel } from './icon.schema'

@ObjectType()
export class CategoryModel extends OmitType(Category, [
  '_count',
  'workspace',
  'icon',
  'parent',
  'childrens',
]) {
  @Field(() => IconModel, { nullable: true })
  icon?: IconModel

  @Field(() => [CategoryModel], { nullable: true })
  childrens?: CategoryModel[]
}
