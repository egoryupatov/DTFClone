import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './comments.entity';
import { EventsGateway } from '../events/events.gateway';

@Controller({ path: '/comments' })
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly socketService: EventsGateway,
  ) {}

  @Get('posts/:id')
  async getPostComments(@Param('id') id: string) {
    return this.commentsService.getPostComments(Number(id));
  }

  @Get('answers/:id')
  async getAnswers(@Param('id') id: string) {
    return this.commentsService.getAnswers(Number(id));
  }

  @Get('live')
  async getLiveComments() {
    return this.commentsService.getLiveComments();
  }

  @Post('add')
  async addComment(@Body() data: Comment) {
    const newComment = await this.commentsService.addComment(data);
    this.socketService.server.emit('newComment', {
      id: newComment.id,
      text: newComment.text,
      user: {
        id: newComment.user.id,
        login: newComment.user.login,
        avatar: newComment.user.avatar,
      },
      post: {
        id: newComment.blogPost.id,
        title: newComment.blogPost.title,
      },
      likes: newComment.likes,
    });
  }

  /* Old */

  @Get('single/:id')
  async getSingleComment(@Param('id') id: string) {
    return this.commentsService.getSingleComment(Number(id));
  }

  @Get()
  async getAllComments(): Promise<Comment[]> {
    return this.commentsService.getAllComments();
  }

  @Get('user/:id')
  async getUserComments(@Param('id') id: string): Promise<Comment[]> {
    return this.commentsService.getUserComments(Number(id));
  }

  @Post(':id/answer')
  async answer(@Body() data: Comment, @Param('id') id: string) {
    await this.commentsService.addAnswer(data, Number(id));
  }

  @Post(':id/increment')
  async incrementRating(@Param('id') id: string) {
    return this.commentsService.incrementRating(Number(id));
  }

  @Post(':id/decrement')
  async decrementRating(@Param('id') id: string) {
    return this.commentsService.decrementRating(Number(id));
  }
}
