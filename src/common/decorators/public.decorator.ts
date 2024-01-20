import { SetMetadata } from '@nestjs/common'
import { IS_PUBLIC_KEY } from '@app/common'

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)
