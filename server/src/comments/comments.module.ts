import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { Comment } from './comments.entity';
import { BlogPost } from '../posts/entity/blogPost.entity';
import { User } from '../users/user.entity';
import { Category } from '../category/category.entity';
import { PostsService } from '../posts/posts.service';
import { EventsGateway } from '../events/events.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, BlogPost, User, Category])],
  providers: [CommentsService, PostsService, EventsGateway],
  controllers: [CommentsController],
})
export class CommentsModule {}
