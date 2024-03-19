import React, { useState, useEffect } from 'react';
import PostItem from './PostItem';

const PostList = ({ posts, title, remove }) => {
   return (
      <div className='postList'>
         <h1>{title}</h1>
         {posts.map((post, index) => <PostItem remove={remove} number={index + 1} post={post} key={post.id} />)}
      </div>
   );
}

export default PostList;