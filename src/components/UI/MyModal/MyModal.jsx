import React, { useState, useEffect } from 'react';
import s from './css/MyModal.module.css';

const MyModal = ({ children, visible, setVisible }) => {

   const rootClasses = [s.myModal]
   const contentClasses = [s.myModalContent]

   if (visible) {
      rootClasses.push(s.active)
      contentClasses.push(s.active)
   }



   return (
      <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
         <div className={contentClasses.join(' ')} onClick={e => e.stopPropagation()}>
            {children}
         </div>

      </div>
   );
}

export default MyModal;