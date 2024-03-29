import React from 'react';
import s from './css/SmallDeleteButton.module.css'

const SmallDeleteButton = ({ ...props }) => {
   return (
      <button {...props} className={s.button}></button>
   );
}

export default SmallDeleteButton;
