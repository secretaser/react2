import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostService from '../API/PostService';
import { useFetching } from '../hooks/useFetching';
import Loader from '../components/UI/Loader/Loader';

const PostIdPage = () => {

   const [post, setPost] = useState({})
   const [comments, setComments] = useState([])

   const [fetchPostById, isPostLoading, postError] = useFetching(async (id) => {
      const response = await PostService.getPostById(id)
      setPost(response.data);
   })

   const [fetchComments, isCommentsLoading, commentsError] = useFetching(async (id) => {
      const response = await PostService.getCommentsByPostId(id)
      setComments(response.data);
   })

   const params = useParams()
   useEffect(() => {
      fetchPostById(params.id)
      fetchComments(params.id)
   }, [params.id]);

   return (
      <div >
         <div>
            {post.id}. {post.title}
         </div>
         Comments
         <div>
            {isCommentsLoading ?
               <Loader />
               :
               comments.map(c => <div key={c.id}>{c.email}: {c.body} </div>)
            }
         </div>
      </div>
   );
}

export default PostIdPage;
