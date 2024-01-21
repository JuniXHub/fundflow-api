import { IconCreateInput } from '@app/@generated/icon/icon-create.input'
import { IconTypes } from '@prisma/client'

export const iconData: IconCreateInput[] = [
  {
    type: IconTypes.FINANCIAL,
    source: 'FaCoins',
    color: '#4287f5',
  },
  {
    type: IconTypes.EDUCATION,
    source: 'FaBook',
    color: '#32a852',
  },
  {
    type: IconTypes.HEALTH,
    source: 'FaStarOfLife',
    color: '#eb4034',
  },
  {
    type: IconTypes.TRANSPORT_AND_TRAVEL,
    source: 'FaCarAlt',
    color: '#fcba03',
  },
]
