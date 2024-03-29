import React from 'react';
import s from './css/DeleteButton.module.css'

const DeleteButton = ({ ...props }) => {
   return (
      <button {...props} className={s.button}></button>
   );
}

export default DeleteButton;
