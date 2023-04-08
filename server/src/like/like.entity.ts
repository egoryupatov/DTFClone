import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { BlogPost } from '../posts/entity/blogPost.entity';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.likes)
  user: User;

  @ManyToOne(() => BlogPost, (blogPost) => blogPost.likes)
  blogPost: BlogPost;
}
