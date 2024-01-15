import { User } from '@prisma/client'
import { Request } from 'express'

export interface ExpressRequest extends Request {
  user?: User
}
