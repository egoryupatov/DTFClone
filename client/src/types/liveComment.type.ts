import { ISubsite } from "@/types/subsite.type";
import { IPost } from "@/types/post.type";

export interface ILiveComment {
  id: number;
  text: string;
  user: ISubsite;
  post: IPost;
}
