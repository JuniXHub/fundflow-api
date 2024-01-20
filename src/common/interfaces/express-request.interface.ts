import { Request } from 'express'
import { JwtPayload, ProviderPayload } from '@app/common'

export interface ExpressRequest extends Request {
  user?: JwtPayload | ProviderPayload
}
