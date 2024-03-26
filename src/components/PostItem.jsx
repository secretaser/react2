import React from 'react';
import MyButton from './UI/button/MyButton';
import { useNavigate } from 'react-router-dom';

const PostItem = (props) => {
   const router = useNavigate()

   return (
      <div className="post">
         <div className="post__content">
            <div className="post__head">{props.post.id}. {props.post.title}</div>
            <div >{props.post.body}</div>
         </div>
         <div className="post__btns">
            <MyButton onClick={() => router(`/posts/${props.post.id}`)}>Open</MyButton>
            <MyButton onClick={() => props.remove(props.post)}>Delete</MyButton>
         </div>
      </div>
   );
}

export default PostItem;