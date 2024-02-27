import React from 'react'
import './Register.scss';

export const Register = () => {
  return (
    <div className='formContainer'>
      <div className="formWrapper">
        <span className="logo">Badger Chat</span>
        <span className="title">Register</span>
        <form>
          <input type="text"  placeholder='Display Name'/>
          <input type="email" placeholder='Email'/>
          <input type="password"  placeholder='Password'/>
          <input style={{display: 'none'}} type="file" id="avatar"/>
          <label
            className='upload-label'
            htmlFor="avatar">
            <div className="upload-label__image">
              
            </div>
            Add an Avatar
          </label>
          <button>Sign Up</button>
        </form>
        <p>You do have an account? Login</p>
      </div> 
    </div>
  )
}
