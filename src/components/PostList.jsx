import React, { useState, useEffect } from 'react';
import PostItem from './PostItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import MyButton from './UI/button/MyButton';
import Loader from './UI/Loader/Loader';

const PostList = ({ posts, title, remove, fetchPosts, isPostsLoading, postError }) => {

   return (
      <div>
         {isPostsLoading ?
            <Loader />
            :
            <p className='postListTitle'>{postError ? `Error "${postError}" occured!` : posts.length ? 'Posts' : 'No posts found!'}</p>
         }
         <TransitionGroup className='postList'>
            {posts.map((post, index) =>
               <CSSTransition
                  key={post.id}
                  // nodeRef={nodeRef}
                  timeout={150}
                  classNames="post">
                  <PostItem
                     remove={remove}
                     number={index + 1}
                     post={post}
                  />
               </CSSTransition>)}
            {!isPostsLoading && <MyButton onClick={e => fetchPosts()}>Load more...</MyButton>}
         </TransitionGroup>
      </div>
   );
}

export default PostList;