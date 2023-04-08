import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
} from 'typeorm';
import { BlogPost } from '../posts/entity/blogPost.entity';
import { Comment } from '../comments/comments.entity';
import { Like } from '../like/like.entity';
import { Category } from '../category/category.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  login: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @Column({ nullable: true })
  banner: string;

  @CreateDateColumn()
  signUpDate: Date;

  @Column()
  rating: number;

  @Column()
  description: string;

  @OneToMany(() => BlogPost, (blogPost) => blogPost.user)
  blogPosts: BlogPost[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  /*  @ManyToMany(() => BlogPost, (blogPost) => blogPost.bannedByUsers, {
    cascade: true,
  })
  @JoinTable({ name: 'hiddenBlogPosts' })
  hiddenBlogPosts: BlogPost[];*/

  @ManyToMany(() => User, (user) => user.subscriptions)
  @JoinTable({ name: 'subscriptions' })
  subscriptions: User[];

  @ManyToMany(() => User, (user) => user.subscribers)
  @JoinTable({ name: 'subscribers' })
  subscribers: User[];

  @ManyToMany(() => Category, (category) => category.subscribers)
  categorySubscriptions: Category[];
}
