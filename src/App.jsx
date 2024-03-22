import PostFilter from './components/PostFilter';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import MyModal from './components/UI/MyModal/MyModal';
import MyButton from './components/UI/button/MyButton';
import './css/App.css';
import React, { useState, useMemo, useEffect } from 'react';
import { usePosts } from './hooks/usePosts';
import PostService from './API/PostService';
import { useFetching } from './hooks/useFetching';
import { getPageCount, getPagesArray } from './utils/pages';



const App = () => {

   const [posts, setPosts] = useState([])
   const [filter, setFilter] = useState({ sort: '', query: '', })
   const [modal, setModal] = useState(false)
   const [totalPages, setTotalPages] = useState(0)
   const [limit, setLimit] = useState(5)
   const [page, setPage] = useState(1)
   const sortedSearchedPosts = usePosts(posts, filter.sort, filter.query)
   let pagesArray = getPagesArray(totalPages)

   console.log('totalPages = ' + totalPages);
   console.log(pagesArray);
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
      <div className="App">
         <MyModal visible={modal} setVisible={setModal}>
            <PostForm create={createPost} />
         </MyModal>
         <PostFilter filter={filter} setFilter={setFilter} />
         <MyButton onClick={() => setModal(true)}>New Post</MyButton>

         <PostList remove={removePost} postError={postError} isPostsLoading={isPostsLoading} fetchPosts={fetchPosts} posts={sortedSearchedPosts} />
         <div className="pagination-buttons">
            {pagesArray.map(p => <button
               key={p}
               className={page === p ? 'pagination-button-current' : 'pagination-button'}
               onClick={() => changePage(p)}
            >{p}</button>)}
         </div>

      </div>
   );
}

export default App;
