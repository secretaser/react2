import React, { useState, useEffect } from 'react';
import MyInput from './UI/input/MyInput';
import MySelect from './UI/select/MySelect';

const PostFilter = ({ filter, setFilter }) => {

   const sortOptions = [
      { value: 'title', name: 'By name' },
      { value: 'body', name: 'By description' },
   ]

   return (
      <div>
         <MyInput
            placeholder='Type here...'
            value={filter.query}
            onChange={e => setFilter({ ...filter, query: e.target.value })} />
         <MySelect
            value={filter.sort}
            onChange={selectedSort => setFilter({ ...filter, sort: selectedSort })}
            defaultValue={'Sort by...'}
            options={sortOptions} />
      </div>
   );
}

export default PostFilter;

