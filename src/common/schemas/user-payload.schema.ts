import { User } from '@app/@generated/user/user.model'
import { PickType } from '@nestjs/graphql'

export class UserPayload extends PickType(User, ['email', 'firstName', 'lastName', 'picture']) {}
