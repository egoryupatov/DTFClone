export interface ISubsite {
  id: number;
  name?: string;
  login?: string;
  description: string;
  avatar: string;
  banner: string;
  rating?: number;
  subscriptions?: number;
  subscribers: number;
  signUpDate?: Date;
}
