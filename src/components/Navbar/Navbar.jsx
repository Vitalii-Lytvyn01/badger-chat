import React from 'react'
import './Navbar.scss';

export const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="logo">Badger Chat</div>
      <div className="user">
        <img src="https://images.pexels.com/photos/1136575/pexels-photo-1136575.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className='user__image'/>
        <div className="user__name">John</div>
        <button className="user__logout">Log Out</button>
      </div>
    </div>
  )
}
