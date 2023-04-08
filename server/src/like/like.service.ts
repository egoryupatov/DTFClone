import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './like.entity';
import { BlogPost } from '../posts/entity/blogPost.entity';
import { User } from '../users/user.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like) private likesRepository: Repository<Like>,
    @InjectRepository(BlogPost) private postsRepository: Repository<BlogPost>,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}
}
