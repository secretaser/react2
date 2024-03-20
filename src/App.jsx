import PostFilter from './components/PostFilter';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import MyModal from './components/UI/MyModal/MyModal';
import MyButton from './components/UI/button/MyButton';
import './css/App.css';
import React, { useState, useMemo } from 'react';



const App = () => {

   const [posts, setPosts] = useState(
      [
         { id: 1, title: 'я ебал ТВОЮ тёлку', body: 'И это правда' },
         { id: 2, title: 'Гена Букин', body: 'Отец русского семейного института' },
         { id: 3, title: 'Слава КПСС', body: 'Как он тут оказался' },
      ]
   )

   const [filter, setFilter] = useState({ sort: '', query: '', })
   const [modal, setModal] = useState(false)

   const sortedPosts = useMemo(() => {
      if (filter.sort) {
         return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
      }
      return posts
   }, [filter.sort, posts])

   const sortedSearchedPosts = useMemo(() => {
      return sortedPosts.filter(post => {
         return post.title.toLowerCase().includes(filter.query.toLowerCase()) || post.body.toLowerCase().includes(filter.query.toLowerCase())
      })
   }, [filter.query, sortedPosts])


   const createPost = (newPost) => {
      setPosts([...posts, newPost])
      setModal(false)
   }
   const removePost = (post) => {
      setPosts(posts.filter(p => p.id !== post.id))
   }

   return (
      <div className="App">
         <MyModal visible={modal} setVisible={setModal}>
            <PostForm create={createPost} />
         </MyModal>
         <PostFilter filter={filter} setFilter={setFilter} />
         <MyButton onClick={() => setModal(true)}>New Post</MyButton>
         <PostList remove={removePost} posts={sortedSearchedPosts} title={sortedSearchedPosts.length ? 'Posts' : 'No posts found!'} />
      </div>
   );
}

export default App;
