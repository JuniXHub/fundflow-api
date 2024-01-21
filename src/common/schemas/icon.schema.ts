import { Icon } from '@app/@generated/icon/icon.model'
import { ObjectType, OmitType } from '@nestjs/graphql'

@ObjectType()
export class IconModel extends OmitType(Icon, ['categories', '_count']) {}
