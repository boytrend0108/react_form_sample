import { User } from "./User";

export type Post = {
  id: number,
  userId: number,
  title: string,
  body: string,
  user: User | null,
}