import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Comment } from './comments.entity';
import { BlogPost } from '../posts/entity/blogPost.entity';
import { User } from '../users/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    @InjectRepository(BlogPost)
    private postsRepository: Repository<BlogPost>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getPostComments(postId: number) {
    const comments = await this.commentsRepository.find({
      relations: {
        user: true,
        children: true,
      },
      where: {
        blogPost: {
          id: postId,
        },
        parent: IsNull(),
      },
    });

    return comments.map((comment: Comment) => ({
      id: comment.id,
      likes: comment.likes,
      text: comment.text,
      publishDate: comment.publishDate,
      user: {
        id: comment.user.id,
        login: comment.user.login,
        avatar: comment.user.avatar,
      },
      numberOfAnswers: comment.children ? comment.children.length : 0,
    }));
  }

  async getAnswers(parentCommentId: number) {
    const answers = await this.commentsRepository.find({
      relations: {
        parent: true,
        children: true,
        user: true,
      },
      where: {
        parent: {
          id: parentCommentId,
        },
      },
    });

    return answers.map((comment: Comment) => ({
      id: comment.id,
      likes: comment.likes,
      text: comment.text,
      publishDate: comment.publishDate,
      user: {
        id: comment.user.id,
        login: comment.user.login,
        avatar: comment.user.avatar,
      },
      numberOfAnswers: comment.children ? comment.children.length : 0,
    }));
  }

  async getLiveComments() {
    const liveComments = await this.commentsRepository.find({
      relations: ['user', 'blogPost'],
      order: {
        id: 'DESC',
      },
      take: 6,
    });

    return liveComments.map((comment: Comment) => ({
      id: comment.id,
      text: comment.text,
      user: {
        id: comment.user.id,
        login: comment.user.login,
        avatar: comment.user.avatar,
      },
      post: {
        id: comment.blogPost.id,
        title: comment.blogPost.title,
      },
    }));
  }

  async addComment(data: Comment) {
    const post = await this.postsRepository.findOneBy({
      id: Number(data.blogPost),
    });

    const user = await this.usersRepository.findOneBy({
      id: Number(data.user),
    });

    const comment = new Comment();

    comment.blogPost = post;
    comment.user = user;
    comment.text = data.text;
    comment.likes = data.likes;

    return this.commentsRepository.save(comment);
  }

  /* Old */

  async getSingleComment(commentId: number) {
    const singleComment = await this.commentsRepository.findOne({
      where: {
        id: commentId,
      },
      relations: {
        parent: true,
        children: true,
      },
    });
    return singleComment;
  }

  async getAllComments() {
    return this.commentsRepository.find({
      relations: {
        blogPost: {
          category: true,
        },
        user: true,
      },
    });
  }

  async getUserComments(id) {
    const comments = await this.commentsRepository.find({
      relations: {
        blogPost: {
          category: true,
        },
      },
      where: {
        user: id,
      },
    });
    return comments;
  }

  async addAnswer(data: Comment, parentCommentId: number) {
    const parentComment = await this.commentsRepository.findOne({
      where: {
        id: parentCommentId,
      },
    });

    const answer = new Comment();

    answer.blogPost = data.blogPost;
    answer.text = data.text;
    answer.user = data.user;
    answer.parent = parentComment;

    await this.commentsRepository.save(answer);
  }

  async incrementRating(id: number) {
    const comment = await this.commentsRepository.findOne({
      relations: {
        user: true,
      },
      where: {
        id: id,
      },
    });

    const user = await this.usersRepository.findOne({
      where: { id: comment.user.id },
    });

    await this.commentsRepository.increment({ id: comment.id }, 'rating', 1);
    await this.usersRepository.increment({ id: user.id }, 'rating', 1);
  }

  async decrementRating(id: number) {
    const comment = await this.commentsRepository.findOne({
      relations: {
        user: true,
      },
      where: {
        id: id,
      },
    });

    const user = await this.usersRepository.findOne({
      where: { id: comment.user.id },
    });

    await this.commentsRepository.decrement({ id: comment.id }, 'rating', 1);
    await this.usersRepository.decrement({ id: user.id }, 'rating', 1);
  }
}
