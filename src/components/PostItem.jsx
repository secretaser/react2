import React, { useEffect, useState } from 'react';
import PostService from '../API/PostService';
import { useFetching } from '../hooks/useFetching';
import Loader from './UI/Loader/Loader';
import Comment from './Comment';
import DeleteButton from './UI/deleteButton/DeleteButton';
import MyButton from './UI/button/MyButton';
import MyInput from './UI/input/MyInput';

const PostItem = ({ number, post, remove }) => {

   const [comments, setComments] = useState([])
   const [limit, setLimit] = useState(1)
   const [offset, setOffset] = useState(0)
   const [moreButton, setMoreButton] = useState(true)
   const [comment, setComment] = useState({ postId: post.id, id: comments.length + 1, name: 'You', email: 'ivan.suv99@gmail.com', body: '' })

   const [fetchComments, isCommentsLoading, commentsError] = useFetching(async (id) => {
      const response = await PostService.getCommentsByPostId(id, limit)
      const newComments = response.data.slice(offset)
      setComments([...comments, ...newComments]);
   })

   useEffect(() => {
      fetchComments(post.id)
      if (limit < 0)
         setMoreButton(false)
   }, [limit]);

   const deleteComment = (commId) => {
      setComments(comments.filter(c => c.id != commId))
   }

   const loadAllComments = () => {
      setOffset(1)
      setLimit(-1)
   }

   const addNewComment = (e) => {
      e.preventDefault()
      if (comment.body) {
         setOffset(1)
         const newComment = {
            ...comment,
            id: Date.now(),

         }
         setComments([newComment, ...comments])
      }
   }

   return (
      <div className="container">
         <div className="post">

            <div className="post__content">
               <div className="post__head">{post.id}. {post.title}</div>
               <div >{post.body}</div>
            </div>
            <div className="post__btns">
               <DeleteButton onClick={() => remove(post)} />
            </div>
         </div>
         <div className="post__comments">
            {comments.map(c => <Comment deleteComment={deleteComment} key={c.id} postId={c.postId} id={c.id} name={c.name} email={c.email} body={c.body} />)}
            {isCommentsLoading && <Loader />}
         </div>
         <div className="post__loadMore">
            {moreButton && <MyButton onClick={() => loadAllComments()}>Show all</MyButton>}
         </div>
         <div className="post__newComment">
            <form>
               <MyInput type="text" placeholder='Type in your comment...' value={comment.body} onChange={e => setComment({ ...comment, body: e.target.value })} />
               <MyButton onClick={addNewComment}></MyButton>
            </form>
         </div>
      </div>
   );
}

export default PostItem;