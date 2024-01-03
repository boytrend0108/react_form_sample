import React from "react";
import { PostForm } from "./components/PostForm";
import { PostList } from "./components/PostList";

import posts from './api/posts.json';
import users from './api/users.json';

import { User } from "./types/User";
import { Post } from "./types/Post";

const initiaPosts: Post[] = posts.map(post => {
  return {...post, user: getUserById(post.userId)};
})

function getUserById(userId: number): User | null {
   return users.find(user => user.id === userId) || null;
}

 export const App: React.FC = () => {
  return (
    <div className="section">
       <h1 className="title">Create a post</h1>
       
       <PostForm />
       <PostList posts={initiaPosts} />
    </div>
  );
}
