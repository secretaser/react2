import React from 'react';

const PostItem = (props) => {
   return (
      <div className="post">
         <div className="post__content">
            <div className="post__head">{props.post.id}. {props.post.title}</div>
            <div >{props.post.body}</div>
         </div>
         <div className="post__btns">
            <button>Delete</button>
         </div>
      </div>
   );
}

export default PostItem;