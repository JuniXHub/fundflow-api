import { Account } from '@app/@generated/account/account.model'
import { ObjectType, OmitType } from '@nestjs/graphql'

@ObjectType()
export class AccountModel extends OmitType(Account, ['workspace']) {}
