import React, { useContext } from 'react';
import s from './css/Navbar.module.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context';

function Navbar() {

   const { isAuth, setIsAuth } = useContext(AuthContext);

   const logout = () => {
      setIsAuth(false)
      localStorage.removeItem('auth')
   }

   return (
      <div className={s.navbar}>
         {isAuth ?
            <div className={s.navbar__links}>
               <div className={s.navbar__left}>
                  <Link className={s.navbar__link} to="/posts">Posts</Link>
                  <Link className={s.navbar__link} to="/about">About</Link>
               </div>
               <div className={s.navbar__right}>
                  <button onClick={() => logout()} className={s.navbar__logout}>Log out</button>
               </div>
            </div>
            :
            <div className={s.navbar__links}>
               <p className={s.navbar__link}>Login</p>
            </div>
         }
      </div>
   );
}

export default Navbar;