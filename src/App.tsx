// #region imports
import React, { useState } from "react";
import { PostForm } from "./components/PostForm";
import { PostList } from "./components/PostList";

import posts from './api/posts.json';

import { Post } from "./types/Post";
import { getUserById } from "./servises/user";
// #endregion

// #region function
const initiaPosts: Post[] = posts.map(post => {
  return {...post, user: getUserById(post.userId)};
});

const getNewId = (posts: Post[]) => {
  return +Math.max(...posts.map(post => post.id)) + 1;
}
//#endregion 

// #region component
 export const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(initiaPosts)

  const addPost = (post: Post) => {
    const newPost = {
      ...post,
      id: getNewId(posts),
    }
    setPosts(currentPosts => [newPost, ...currentPosts]);
  };

  return (
    <div className="section">
       <h1 className="title">Create a post</h1>
       
       <PostForm onSubmit={addPost}/>
       <PostList posts={posts} />
    </div>
  );
}
// #endregion