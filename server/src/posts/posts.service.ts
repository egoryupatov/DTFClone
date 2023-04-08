import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogPost } from './entity/blogPost.entity';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Category } from '../category/category.entity';
import { Like, ILike } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(BlogPost) private postsRepository: Repository<BlogPost>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async getNews(offset: number) {
    const news = await this.postsRepository.find({
      take: 4,
      relations: {
        comments: true,
      },
      skip: offset,
    });

    return news.map((post: any) => ({
      id: post.id,
      title: post.title,
      comments: post.comments.length,
    }));
  }

  async getPostsFeed() {
    const postsFeed = await this.postsRepository.find({
      take: 10,
      relations: ['comments', 'category', 'user'],
    });

    return postsFeed.map((post: any) => ({
      id: post.id,
      publishDate: post.publishDate,
      title: post.title,
      description: post.description,
      image: post.image,
      likes: post.likes,
      user: {
        id: post.user.id,
        login: post.user.login,
      },
      comments: post.comments.length,
      category: {
        id: post.category.id,
        name: post.category.name,
        avatar: post.category.avatar,
      },
    }));
  }

  async getPost(id: string) {
    const post = await this.postsRepository.findOne({
      where: {
        id: Number(id),
      },
      relations: ['comments', 'category', 'user'],
    });

    post.views += 1;

    await this.postsRepository.save(post);

    const res = {
      id: post.id,
      publishDate: post.publishDate,
      title: post.title,
      description: post.description,
      image: post.image,
      likes: post.likes,
      views: post.views,
      user: {
        id: post.user.id,
        login: post.user.login,
      },
      text: post.text,
      comments: post.comments.length,
      category: {
        id: post.category.id,
        name: post.category.name,
        image: post.category.avatar,
      },
    };

    return res;
  }

  async getUserPosts(userID: number) {
    const userPosts = await this.postsRepository.find({
      where: {
        user: {
          id: userID,
        },
      },
      take: 10,
      relations: ['comments', 'category', 'user'],
    });

    return userPosts.map((post: any) => ({
      id: post.id,
      publishDate: post.publishDate,
      title: post.title,
      description: post.description,
      image: post.image,
      likes: post.likes,
      user: {
        id: post.user.id,
        login: post.user.login,
      },
      comments: post.comments.length,
      category: {
        id: post.category.id,
        name: post.category.name,
        avatar: post.category.avatar,
      },
    }));
  }

  async getCategoryPosts(categoryID: number) {
    const categoryPosts = await this.postsRepository.find({
      where: {
        category: {
          id: categoryID,
        },
      },
      take: 10,
      relations: ['comments', 'category', 'user'],
    });

    return categoryPosts.map((post: any) => ({
      id: post.id,
      publishDate: post.publishDate,
      title: post.title,
      description: post.description,
      image: post.image,
      likes: post.likes,
      user: {
        id: post.user.id,
        login: post.user.login,
      },
      comments: post.comments.length,
      category: {
        id: post.category.id,
        name: post.category.name,
        avatar: post.category.avatar,
      },
    }));
  }

  async getSearchResults(searchQuery: string) {
    const searchResults = await this.postsRepository.find({
      where: { title: ILike(`%${searchQuery}%`) },
    });

    return searchResults.map((result) => ({
      id: result.id,
      title: result.title,
    }));
  }

  /* Old */

  /*  async getAllPostsWithoutBanned(userId: number): Promise<BlogPost[]> {
    const user = await this.userRepository.findOneOrFail({
      relations: {
        hiddenBlogPosts: true,
      },
      where: {
        id: userId,
      },
    });

    const posts = await this.postsRepository.find({
      relations: {
        bannedByUsers: true,
        user: true,
        category: true,
        comments: true,
      },
      where: {
        id: Not(In(user.hiddenBlogPosts.map((article) => article.id))),
      },
    });

    return posts;
  }

  async getHiddenPosts(userId: number): Promise<BlogPost[]> {
    const user = await this.userRepository.findOne({
      relations: {
        hiddenBlogPosts: true,
      },
      where: {
        id: userId,
      },
    });

    const posts = await this.postsRepository.find({
      relations: {
        bannedByUsers: true,
        user: true,
        category: true,
      },
      where: {
        id: In(user.hiddenBlogPosts.map((article) => article.id)),
      },
    });

    return posts;
  }*/

  async getSinglePost(id: number): Promise<BlogPost> {
    const post = await this.postsRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        category: true,
        user: true,
        comments: true,
      },
    });

    return post;
  }

  async addPost(post: BlogPost) {
    await this.postsRepository.save(post);
  }

  /* async editPost(id: number, data: Article) {
    const updatedPost = await this.postsRepository.findOne({
      relations: {
        category: true,
        author: true,
        comments: true,
      },
      where: { id: id },
    });

    return this.postsRepository.update(updatedPost.id, data);
  }*/

  async deletePost(id: number) {
    await this.postsRepository.delete(id);
  }

  async incrementRating(id: number) {
    const post = await this.postsRepository.findOne({
      relations: {
        user: true,
      },
      where: {
        id: id,
      },
    });

    const user = await this.userRepository.findOne({
      where: { id: post.user.id },
    });

    await this.postsRepository.increment({ id: post.id }, 'rating', 1);
    await this.userRepository.increment({ id: user.id }, 'rating', 1);
  }

  async decrementRating(id: number) {
    const post = await this.postsRepository.findOne({
      relations: {
        user: true,
      },
      where: {
        id: id,
      },
    });

    const user = await this.userRepository.findOne({
      where: { id: post.user.id },
    });

    await this.postsRepository.decrement({ id: post.id }, 'rating', 1);
    await this.userRepository.decrement({ id: user.id }, 'rating', 1);
  }

  async getPostsByCategory(postCategory: string): Promise<BlogPost[]> {
    const category = await this.categoryRepository.findOne({
      where: {
        name: postCategory,
      },
    });

    const posts = await this.postsRepository.find({
      relations: {
        category: true,
        comments: true,
        user: true,
      },
      where: {
        category: category,
      },
    });

    return posts;
  }
}
