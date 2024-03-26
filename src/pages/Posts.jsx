
// import './css/App.css';
import React, { useState, useEffect } from 'react';
import './css/Posts.css'
import PostService from "../API/PostService"
import { useFetching } from "../hooks/useFetching"
import { usePosts } from '../hooks/usePosts';
import MyModal from '../components/UI/MyModal/MyModal';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import MyButton from '../components/UI/button/MyButton';
import PostList from '../components/PostList';
import Pagination from '../components/UI/pagination/Pagination';
import { getPageCount } from '../utils/pages';



const Posts = () => {

   const [posts, setPosts] = useState([])
   const [filter, setFilter] = useState({ sort: '', query: '', })
   const [modal, setModal] = useState(false)
   const [totalPages, setTotalPages] = useState(0)
   const [limit, setLimit] = useState(10)
   const [page, setPage] = useState(1)
   const sortedSearchedPosts = usePosts(posts, filter.sort, filter.query)


   const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
      const response = await PostService.getAll(limit, page)
      setPosts(response.data);
      const totalCount = response.headers['x-total-count']
      setTotalPages(getPageCount(totalCount, limit))
   })


   useEffect(() => {
      fetchPosts(limit, page)
   }, []);

   const createPost = (newPost) => {
      setPosts([...posts, newPost])
      setModal(false)
   }

   const removePost = (post) => {
      setPosts(posts.filter(p => p.id !== post.id))
   }

   const changePage = (newPage) => {
      if (newPage !== page) {
         setPage(newPage)
         fetchPosts(limit, newPage)
      }
   }

   return (
      <div className="postsPage">
         <MyModal visible={modal} setVisible={setModal}>
            <PostForm create={createPost} />
         </MyModal>
         <PostFilter filter={filter} setFilter={setFilter} />
         <MyButton onClick={() => setModal(true)}>New Post</MyButton>

         <PostList remove={removePost} postError={postError} isPostsLoading={isPostsLoading} fetchPosts={fetchPosts} posts={sortedSearchedPosts} />
         <Pagination totalPages={totalPages} page={page} changePage={changePage} />
      </div>
   );
}

export default Posts;




