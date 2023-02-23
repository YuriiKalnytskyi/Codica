import { Body, Param } from '@nestjs/common';
import { ApiAuthDelete, ApiAuthPost, ApiAuthPut, ApiController, ApiGet } from '../common/decorators';
import { IdDTO } from '../common/dtos';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto';
import { Category } from '../../db/models';

@ApiController('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {};

  @ApiAuthPost('create-category', 'creation of a category', IdDTO)
  async createCategory(@Body() data: CategoryDto): Promise<IdDTO> {
    return await this.categoryService.createCategory(data);
  };

  @ApiGet('/:id', 'get category by id', Category)
  async getCategoryById(@Param('id') id: string): Promise<Category> {
    return await this.categoryService.getCategoryById(id);
  };

  @ApiGet('get-all/category', 'get all category', [Category])
  async getAllCategory(): Promise<Category[]> {
    return await this.categoryService.getAllCategory();
  };

  @ApiAuthPut('modify/:id', 'modify category by id', IdDTO)
  async modifyCategory(
    @Param('id') id: string,
    @Body() data: Partial<CategoryDto>
  ): Promise<IdDTO> {
    return await this.categoryService.modifyCategory(id, data);
  };

  @ApiAuthDelete('/:id', 'delete category by id', IdDTO)
  async deleteCategoryById(@Param('id') id: string): Promise<IdDTO> {
    return await this.categoryService.deleteCategoryById(id);
  };
}
