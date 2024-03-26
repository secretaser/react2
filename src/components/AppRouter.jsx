import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../router'
import { AuthContext } from '../context';
import Loader from './UI/Loader/Loader';

const AppRouter = () => {
   // const isAuth = false
   const { isAuth, isLoading } = useContext(AuthContext);

   if (isLoading) {
      return <Loader />
   }

   return (
      isAuth ?
         <Routes>
            {privateRoutes.map(r => <Route key={r.path} path={r.path} Component={r.component} exact={r.exact} />)}
            < Route path="/*" element={<Navigate to="/posts" />} />
         </Routes>
         :
         <Routes>
            {publicRoutes.map(r => <Route key={r.path} path={r.path} Component={r.component} exact={r.exact} />)}
            < Route path="/*" element={<Navigate to="/login" />} />
         </Routes>
   );
}

export default AppRouter;
