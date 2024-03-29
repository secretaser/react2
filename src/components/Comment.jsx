import React from 'react';
import s from './css/Comment.module.css'
import SmallDeleteButton from './UI/deleteButton/SmallDeleteButton';

const Comment = ({ postId, id, name, email, body, deleteComment }) => {

   const onDelete = () => {
      deleteComment(id)
   }

   return (
      <div className={s.content}>
         <div className={s.text}>

            <div className={s.authorInfo}>
               <div className={s.name}>{name}</div>
               <div className={s.email}>{email}</div>
            </div>
            <div className={s.body}>{body}</div>
         </div>
         <SmallDeleteButton onClick={() => onDelete()} />

      </div>
   );
}

export default Comment;
