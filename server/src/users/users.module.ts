import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { BlogPost } from '../posts/entity/blogPost.entity';
import { Comment } from '../comments/comments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, BlogPost, Comment])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
