import React from 'react';
import MyButton from './UI/button/MyButton';

const PostItem = (props) => {

   return (
      <div className="post">
         <div className="post__content">
            <div className="post__head">{props.number}. {props.post.title}</div>
            <div >{props.post.body}</div>
         </div>
         <div className="post__btns">
            <MyButton onClick={() => props.remove(props.post)}>Delete</MyButton>
         </div>
      </div>
   );
}

export default PostItem;