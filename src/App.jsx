import PostForm from './components/PostForm';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyInput from './components/UI/input/MyInput';
import MySelect from './components/UI/select/MySelect';
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
   const [selectedSort, setSelectedSort] = useState('')

   const [searchQuery, setSearchQuery] = useState('');

   const sortedPosts = useMemo(() => {
      console.log('getSortedPosts отработала');
      if (selectedSort) {
         return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
      }
      return posts
   }, [selectedSort, posts])

   const sortedSearchedPosts = useMemo(() => {
      return sortedPosts.filter(post => {
         return post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.body.toLowerCase().includes(searchQuery.toLowerCase())
      })
   }, [searchQuery, sortedPosts])


   const createPost = (newPost) => {
      setPosts([...posts, newPost])
   }
   const removePost = (post) => {
      setPosts(posts.filter(p => p.id !== post.id))
   }

   const sortOptions = [
      { value: 'title', name: 'By name' },
      { value: 'body', name: 'By description' },
   ]

   const sortPosts = (sort) => {
      setSelectedSort(sort)
   }

   return (
      <div className="App">
         <PostForm create={createPost} />
         <MyInput placeholder='Type here...' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
         <MySelect value={selectedSort} onChange={sortPosts} defaultValue={'Сортировка по...'} options={sortOptions} />
         <PostList remove={removePost} posts={sortedSearchedPosts} title={sortedSearchedPosts.length ? 'Posts' : 'No posts found!'} />
      </div>
   );
}

export default App;
