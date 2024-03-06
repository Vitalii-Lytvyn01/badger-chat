import React from 'react'
import './Login.scss';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();

  return (
    <div className='formContainer'>
      <div className="formWrapper">
        <span className="logo">Badger Chat</span>
        <span className="title">Login</span>
        <form>
          <input type="email" placeholder='Email'/>
          <input type="password"  placeholder='Password'/>
          <button>Login</button>
        </form>
        <p>Don't have an account? 
          <span onClick={() => navigate("/register")}> Register</span>
        </p>
      </div> 
    </div>
  )
}