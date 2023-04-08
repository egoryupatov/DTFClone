import { Controller, Get, Param } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller({ path: '/category' })
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.categoryService.getCategory(id);
  }
}
