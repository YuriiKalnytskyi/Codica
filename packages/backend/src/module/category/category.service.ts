import { Injectable } from '@nestjs/common';
import { BaseAuthService } from '../common/services/base-auth.service';
import { IdDTO } from '../common/dtos';
import { CategoryDto } from './dto/category.dto';
import { ErrorHandler } from '../common/errors';
import { Category } from '../../db/models';

@Injectable()
export class CategoryService extends BaseAuthService {
  async createCategory(data: CategoryDto): Promise<IdDTO> {
    const category = await Category.findOne({ where: { name: data.name } });

    if (category) ErrorHandler({ message: 'ALREADY_EXIST_CATEGORY' });

    const newCategory = Category.create({ name: data.name });
    const res = await Category.save(newCategory);

    return { id: res.id };
  };

  async getCategoryById(id: string): Promise<Category> {
    const category = await Category.findOne({ where: { id } });

    if (!category) ErrorHandler({ message: 'ALREADY_EXIST_CATEGORY_NOT_EXIST' });

    return category;
  };

  async getAllCategory(): Promise<Category[]> {
    const category = await Category.find();

    if (!category.length) ErrorHandler({ message: 'ALREADY_EXIST_CATEGORY_NOT_EXIST' });

    return category;
  };

  async modifyCategory(id: string, data: Partial<CategoryDto>): Promise<IdDTO> {
    const category = await Category.findOne({ where: { id } });

    if (!category) ErrorHandler({ message: 'ALREADY_EXIST_CATEGORY_NOT_EXIST' });

    Object.assign(category, data);
    const res = await Category.save(category);

    return { id: res.id };
  };

  async deleteCategoryById(id: string): Promise<IdDTO> {
    const category = await Category.findOne({ where: { id } , relations:['transaction']});

    if (category.transaction[0] !== undefined) ErrorHandler({ message: 'DELETION_NOT_POSSIBLE' });

    await Category.delete({ id });

    return { id };
  };
}
