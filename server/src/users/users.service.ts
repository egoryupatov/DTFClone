import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { BlogPost } from '../posts/entity/blogPost.entity';
import { Comment } from '../comments/comments.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(BlogPost) private postsRepository: Repository<BlogPost>,
    @InjectRepository(Comment) private commentsRepository: Repository<Comment>,
  ) {}

  async getUser(id: string) {
    const user = await this.usersRepository.findOne({
      where: {
        id: Number(id),
      },
      relations: ['subscriptions', 'subscribers'],
    });

    const res = {
      id: user.id,
      login: user.login,
      description: user.description,
      avatar: user.avatar,
      banner: user.banner,
      rating: user.rating,
      subscriptions: user.subscriptions.length,
      subscribers: user.subscribers.length,
      signUpDate: user.signUpDate,
    };

    return res;
  }

  /* Old */

  async findByLogin(login: string): Promise<User | undefined> {
    return this.usersRepository.findOneByOrFail({ login: login });
  }

  async findById(id: number): Promise<User | undefined> {
    return this.usersRepository.findOneByOrFail({ id: id });
  }

  /* async getLoggedUserInfo(userId): Promise<Partial<User> | undefined> {
    const user = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
      relations: {
        comments: {
          blogPost: {
            category: true,
          },
          user: true,
        },
        blogPosts: {
          category: true,
          user: true,
          comments: true,
        },
        hiddenBlogPosts: true,
        subscriptions: true,
        subscribers: true,
      },
    });

    const { password, ...securedUser } = user;
    return securedUser;
  }*/

  /*  async hidePost(data) {
    const user = await this.usersRepository.findOneOrFail({
      where: { id: data.userId },
      relations: {
        hiddenBlogPosts: true,
      },
    });

    const blogPost = await this.postsRepository.findOneOrFail({
      where: { id: data.postId },
      relations: {
        bannedByUsers: true,
      },
    });

    user.hiddenBlogPosts = [...user.hiddenBlogPosts, blogPost];

    await this.usersRepository.save(user);
  }

  async unHidePost(data) {
    const user = await this.usersRepository.findOneOrFail({
      where: { id: data.userId },
      relations: {
        hiddenBlogPosts: true,
      },
    });

    user.hiddenBlogPosts = user.hiddenBlogPosts.filter((e) => {
      return e.id !== data.postId;
    });

    await this.usersRepository.save(user);
  }*/

  async subscribeToUser(userId: number, subId: number) {
    const user = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
      relations: {
        subscriptions: true,
      },
    });

    const subscribedTo = await this.usersRepository.findOne({
      where: {
        id: subId,
      },
      relations: {
        subscribers: true,
      },
    });

    user.subscriptions = [...user.subscriptions, subscribedTo];
    subscribedTo.subscribers = [...subscribedTo.subscribers, user];

    await this.usersRepository.save(user);
    await this.usersRepository.save(subscribedTo);
  }

  async unsubscribeFromUser(userId: number, subId: number) {
    const user = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
      relations: {
        subscriptions: true,
      },
    });

    const subscribedTo = await this.usersRepository.findOne({
      where: {
        id: subId,
      },
      relations: {
        subscribers: true,
      },
    });

    user.subscriptions = user.subscriptions.filter((sub) => {
      return sub.id !== subscribedTo.id;
    });

    subscribedTo.subscribers = subscribedTo.subscribers.filter((sub) => {
      return sub.id !== user.id;
    });

    await this.usersRepository.save(user);
    await this.usersRepository.save(subscribedTo);
  }
}
