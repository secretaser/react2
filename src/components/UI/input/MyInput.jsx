import React from 'react';
import s from './css/MyInput.module.css';

const MyInput = React.forwardRef((props, ref) => {
   return (
      <input ref={ref} className={s.myInput} {...props} />
   );
})

export default MyInput;