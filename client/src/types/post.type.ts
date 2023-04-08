import { ISubsite } from "@/types/subsite.type";
import { IComment } from "@/types/comment.type";
import { ICategory } from "@/types/category.type";

export interface IPost {
  id: number;
  publishDate: Date;
  title: string;
  description: string;
  text: string;
  image: string;
  likes: number;
  views: number;
  user: ISubsite;
  comments: number;
  category: ICategory;
}
