import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { BlogPost } from '../posts/entity/blogPost.entity';
import { Like } from './like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Like, User, BlogPost])],
  providers: [LikeService],
  controllers: [LikeController],
})
export class LikeModule {}
