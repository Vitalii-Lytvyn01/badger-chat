import React, { useState } from 'react'
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../misc/firebase';

export const Login = () => {
  const navigate = useNavigate();

  const [error,setError] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      const resp = await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch(error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      setError(true);
      console.log(errorCode,errorMessage);
    }
  }

  return (
    <div className='formContainer'>
      <div className="formWrapper">
        <span className="logo">Badger Chat</span>
        <span className="title">Login</span>
        <form 
          onSubmit={handleSubmit}
        >
          <input type="email" placeholder='Email'/>
          <input type="password"  placeholder='Password'/>
          <button>Login</button>
        </form>
        {error ? <span>An error has occured</span> : ''}
        <p>Don't have an account? 
          <span 
            className='link'
            onClick={() => navigate("/register")}> Register
          </span>
        </p>
      </div> 
    </div>
  )
}