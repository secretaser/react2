import React from 'react';
import s from './css/Pagination.module.css'
import { getPagesArray } from '../../../utils/pages';

const Pagination = ({ page, changePage, totalPages }) => {

   let pagesArray = getPagesArray(totalPages)
   return (
      <div className={s.pagination_buttons}>
         {pagesArray.map(p => <button
            key={p}
            className={page === p ? s.pagination_button_current : s.pagination_button}
            onClick={() => changePage(p)}
         >{p}</button>)}
      </div>
   );
}

export default Pagination;