export interface IPostFeed {
  id: number;
  publishDate: Date;
  title: string;
  description: string;
  image: string;
  likes: number;
  user: {
    id: number;
    login: string;
  };
  comments: number;
  category: {
    id: number;
    name: string;
    avatar: string;
  };
}
