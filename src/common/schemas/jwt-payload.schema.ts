import { User } from '@app/@generated/user/user.model'
import { PickType } from '@nestjs/graphql'

export class JwtPayload extends PickType(User, ['id', 'email']) {}
