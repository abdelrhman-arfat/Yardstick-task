import { TCategory } from "../constants/Category";

export type TDate = {
  description: string;
  amount: number;
  date: string;
  _id: string;
  userId: string;
  category: TCategory;
};
