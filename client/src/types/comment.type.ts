import { ISubsite } from "@/types/subsite.type";
import { IPost } from "@/types/post.type";

export interface IComment {
  id: number;
  likes: number;
  text: string;
  publishDate: Date;
  user: ISubsite;
  numberOfAnswers: number;
}
