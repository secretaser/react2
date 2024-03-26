import React, { useState, useEffect } from 'react';
import PostItem from './PostItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Loader from './UI/Loader/Loader';

const PostList = ({ posts, title, remove, fetchPosts, isPostsLoading, postError }) => {

   return (
      <div>
         {isPostsLoading ?
            <Loader />
            :
            <p className='postListTitle'>{postError ? `Error "${postError}" occured!` : posts.length ? 'Posts' : 'No posts found!'}</p>
         }
         {/* <TransitionGroup className='postList'> */}
         <div className='postList'>
            {posts.map((post, index) =>
               // <CSSTransition
               // key = { post.id }
               //       timeout = { 150}
               //       classNames = "post" >
               <PostItem
                  key={post.id}
                  remove={remove}
                  number={index + 1}
                  post={post}
               />
               // </CSSTransition>
            )}
         </div>
         {/* </TransitionGroup> */}
      </div>
   );
}

export default PostList;