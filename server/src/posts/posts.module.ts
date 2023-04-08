import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogPost } from './entity/blogPost.entity';
import { User } from '../users/user.entity';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Category } from '../category/category.entity';
import { Comment } from '../comments/comments.entity';
import { EventsGateway } from '../events/events.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([BlogPost, User, Category, Comment])],
  providers: [PostsService, EventsGateway],
  controllers: [PostsController],
})
export class PostsModule {}
