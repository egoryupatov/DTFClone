import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BlogPost } from '../posts/entity/blogPost.entity';
import { User } from '../users/user.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  avatar: string;

  @Column({ nullable: true })
  banner: string;

  @OneToMany(() => BlogPost, (blogPost) => blogPost.category)
  blogPosts: BlogPost[];

  @ManyToMany(() => User, (user) => user.categorySubscriptions)
  @JoinTable()
  subscribers: User[];
}
