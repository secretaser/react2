import React from 'react';
import s from './css/MyButton.module.css'

const MyButton = ({ children, ...props }) => {
   return (
      <button {...props} className={s.myBtn}>{children}</button>
   );
}

export default MyButton;