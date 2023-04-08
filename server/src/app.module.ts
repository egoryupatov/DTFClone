import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { Comment } from './comments/comments.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CommentsModule } from './comments/comments.module';
import { Category } from './category/category.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { BlogPost } from './posts/entity/blogPost.entity';
import { LikeModule } from './like/like.module';
import { Like } from './like/like.entity';
import { CategoryModule } from './category/category.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/pictures',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: 'postgres',
      port: 5432,
      database: 'blog_pg',
      entities: [User, BlogPost, Comment, Category, Like],
      synchronize: true,
      autoLoadEntities: true,
    }),
    ConfigModule.forRoot(),
    UsersModule,
    PostsModule,
    CommentsModule,
    AuthModule,
    LikeModule,
    CategoryModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
