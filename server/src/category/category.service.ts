import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { User } from '../users/user.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getCategory(id: string) {
    const category = await this.categoriesRepository.findOne({
      where: {
        id: Number(id),
      },
      relations: ['subscribers'],
    });

    const res = {
      id: category.id,
      name: category.name,
      description: category.description,
      avatar: category.avatar,
      banner: category.banner,
      subscribers: category.subscribers.length,
    };

    return res;
  }
}
