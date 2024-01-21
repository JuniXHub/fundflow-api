import { PartialType } from '@nestjs/graphql'
import { CreateCategoryDto } from './create-category.dto'

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  categoryId: number
}
