import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BlogPost } from '../posts/entity/blogPost.entity';
import { User } from '../users/user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => BlogPost, (blogPost) => blogPost.comments)
  blogPost: BlogPost;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @Column()
  text: string;

  @Column({ default: 0 })
  likes: number;

  @CreateDateColumn()
  publishDate: Date;

  @ManyToOne((type) => Comment, (comment) => comment.children)
  parent: Comment;

  @OneToMany((type) => Comment, (comment) => comment.parent)
  children: Comment[];
}
