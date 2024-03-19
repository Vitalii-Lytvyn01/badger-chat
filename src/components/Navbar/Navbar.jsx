import React, { useContext } from 'react'
import './Navbar.scss';
import { signOut } from 'firebase/auth';
import { auth } from '../../misc/firebase';
import { AuthContext } from '../../context/AuthContext';

export const Navbar = () => {

  const {currentUser} = useContext(AuthContext);

  return (
    <div className='navbar'>
      <div className="logo">Badger Chat</div>
      <div className="user">
        <img src={currentUser.photoURL} alt="" className='user__image'/>
        <div className="user__name">{currentUser.displayName}</div>
        <button
          className="user__logout"
          onClick={() => {signOut(auth)}}
        >Log Out</button>
      </div>
    </div>
  )
}
