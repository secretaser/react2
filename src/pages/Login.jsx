import React, { useContext, useState } from 'react';
import MyInput from '../components/UI/input/MyInput';
import MyButton from '../components/UI/button/MyButton';
import { AuthContext } from '../context';

const Login = () => {

   const [login, setLogin] = useState('')
   const [password, setPassword] = useState('')
   const { isAuth, setIsAuth } = useContext(AuthContext);

   const submit = (e) => {
      e.preventDefault()
      if (login === 'secretaser' && password === 'secretaser') {
         setIsAuth(true)
         localStorage.setItem('auth', 'true')
      }
   }

   return (
      <div>
         <h1>Login</h1>
         <form onSubmit={submit}>
            <MyInput type="text" placeholder='Your login...' value={login} onChange={e => setLogin(e.target.value)} />
            <MyInput type="password" placeholder='Your password...' value={password} onChange={e => setPassword(e.target.value)} />
            <MyButton>Login</MyButton>
         </form>
      </div>
   );
}

export default Login;
