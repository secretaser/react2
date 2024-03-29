
// import './css/App.css';
import React, { useState, useEffect, useRef } from 'react';
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
import { useObserver } from '../hooks/useObserver';
import Loader from '../components/UI/Loader/Loader';
import MySelect from '../components/UI/select/MySelect';



const Posts = () => {

   const [posts, setPosts] = useState([])
   const [filter, setFilter] = useState({ sort: '', query: '', })
   const [modal, setModal] = useState(false)
   const [totalPages, setTotalPages] = useState(0)
   const [limit, setLimit] = useState(5)
   const [page, setPage] = useState(1)
   const sortedSearchedPosts = usePosts(posts, filter.sort, filter.query)
   const lastElement = useRef()

   const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
      const response = await PostService.getAll(limit, page)
      setPosts([...posts, ...response.data]);
      const totalCount = response.headers['x-total-count']
      setTotalPages(getPageCount(totalCount, limit))
   })

   useObserver(lastElement, page < totalPages, isPostsLoading, () => {
      setPage(page + 1)
   })

   useEffect(() => {
      if (limit == -1)
         setPage(1)
      fetchPosts(limit, page)
   }, [page, limit]);

   const createPost = (newPost) => {
      setPosts([...posts, newPost])
      setModal(false)
   }

   const removePost = (post) => {
      setPosts(posts.filter(p => p.id !== post.id))
   }

   // const changePage = (newPage) => {
   //    if (newPage !== page)
   //    setPage(newPage)

   // }

   return (
      <div className="postsPage">
         <MyModal visible={modal} setVisible={setModal}>
            <PostForm create={createPost} />
         </MyModal>
         <PostFilter filter={filter} setFilter={setFilter} />
         <MySelect
            value={limit}
            onChange={val => setLimit(val)}
            defaultValue={'Portion size...'}
            options={[
               { value: 5, name: '5' },
               { value: 10, name: '10' },
               { value: 15, name: '15' },
               { value: 20, name: '20' },
               { value: -1, name: 'All' },
            ]}
         />
         <MyButton onClick={() => setModal(true)}>New Post</MyButton>

         <PostList remove={removePost} postError={postError} isPostsLoading={isPostsLoading} fetchPosts={fetchPosts} posts={sortedSearchedPosts} />
         {isPostsLoading && <Loader />}
         <div ref={lastElement} style={{ height: 50, background: 'transparent' }}></div>
         {/* <Pagination totalPages={totalPages} page={page} changePage={changePage} /> */}
      </div>
   );
}

export default Posts;




