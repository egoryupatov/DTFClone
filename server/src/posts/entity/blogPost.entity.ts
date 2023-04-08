import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/user.entity';
import { Comment } from '../../comments/comments.entity';
import { Category } from '../../category/category.entity';

@Entity()
export class BlogPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('text')
  text: string;

  @Column({ nullable: true })
  image: string;

  @Column({ default: 0 })
  likes: number;

  @Column({ default: 0 })
  views: number;

  @CreateDateColumn()
  publishDate: Date;

  @ManyToOne(() => Category, (category) => category.blogPosts)
  category: Category;

  @ManyToOne(() => User, (user) => user.blogPosts)
  user: User;

  @OneToMany(() => Comment, (comments) => comments.blogPost)
  comments: Comment[];

  /*@ManyToMany(() => User, (user) => user.hiddenBlogPosts)
  bannedByUsers: User[];*/

  /* @OneToMany(() => Like, (likes) => likes.blogPost)
  likes: Like[];*/
}
