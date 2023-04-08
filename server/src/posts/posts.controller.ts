import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { BlogPost } from './entity/blogPost.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { EventsGateway } from '../events/events.gateway';

@Controller({ path: '/posts' })
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly socketService: EventsGateway,
  ) {}

  @Get('news')
  async getNews(@Query('offset') offset: number) {
    return this.postsService.getNews(offset);
  }

  @Get('feed')
  async getPostsFeed() {
    return this.postsService.getPostsFeed();
  }

  @Get('user/:id')
  async getUserPosts(@Param('id') id: string) {
    return this.postsService.getUserPosts(Number(id));
  }

  @Get('category/:id')
  async getCategoryPosts(@Param('id') id: string) {
    return this.postsService.getCategoryPosts(Number(id));
  }

  @Get(':id')
  async getPost(@Param('id') id: string) {
    this.socketService.server.emit('incrementView');
    return this.postsService.getPost(id);
  }

  @Get('search/:query')
  async getSearchResults(@Param('query') query: string) {
    return this.postsService.getSearchResults(query);
  }

  /* Old */

  /*  @Get('all')
  async getAllPostsWithoutBanned(@Req() request): Promise<BlogPost[]> {
    return this.postsService.getAllPostsWithoutBanned(request.user?.id);
  }

  @Get('hidden')
  async getHiddenPosts(@Req() request): Promise<BlogPost[]> {
    return this.postsService.getHiddenPosts(request.user?.id);
  }*/

  @Get('category/:category/:id')
  async getSinglePost(@Param('id') id: string): Promise<BlogPost> {
    return this.postsService.getSinglePost(Number(id));
  }

  @Get('category/:category')
  async getPostsByCategory(
    @Param('category') category: string,
  ): Promise<BlogPost[]> {
    return this.postsService.getPostsByCategory(category);
  }

  @Post()
  addPost(@Body() data: BlogPost) {
    return this.postsService.addPost(data);
  }

  @Post('/image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(
            null,
            file.fieldname + '-' + uniqueSuffix + extname(file.originalname),
          );
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return JSON.stringify(file.filename);
  }

  /*  @Put(':id')
  @UseGuards(AuthGuard)
  async editPost(@Param('id') id: string, @Body() data: Article) {
    await this.postsService.editPost(Number(id), data);
  }*/

  @Delete()
  async deletePost(@Body() id: number) {
    await this.postsService.deletePost(id);
  }

  @Post('rating/increment')
  async incrementRating(@Body() body) {
    return this.postsService.incrementRating(Number(body.id));
  }

  @Post('rating/decrement')
  async decrementRating(@Body() body) {
    return this.postsService.decrementRating(Number(body.id));
  }
}
