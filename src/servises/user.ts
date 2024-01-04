import { User } from "../types/User";
import users from '../api/users.json'

export const getUserById = (userId: number): User | null => {
  return users.find(user => user.id === userId) || null;
}