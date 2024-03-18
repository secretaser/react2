import PostItem from './components/PostItem';
import './css/App.css';
import React, { useState } from 'react';



const App = () => {

   const [posts, setPosts] = useState(
      [
         { id: 1, title: 'JS', body: 'Description' },
         { id: 2, title: 'JS1', body: 'Description 1' },
         { id: 3, title: 'JS2', body: 'Description 2' },
      ]
   )

   return (
      <div className="App">
         <h1>Post list</h1>
         {posts.map(post => <PostItem post={post} key={post.id} />)}
      </div>
   );
}

export default App;
