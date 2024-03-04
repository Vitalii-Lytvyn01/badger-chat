import React from 'react'
import './Sidebar.scss'
import { Navbar } from '../Navbar/Navbar'
import { Search } from '../Search/Search'

export const Sidebar = () => {

  console.log(document)

  return (
    <div className='sidebar'>
      <Navbar/>
      <Search/>
      <div className="chat-list">
        <div className="user-chat">
          <img
            src="https://images.pexels.com/photos/1136575/pexels-photo-1136575.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            className="user-chat__image"
          />
          <div className="user-chat__info">
            <div className="display-name">John</div>
            <div className="message-preview">This is last message...</div>
          </div>
        </div>
      </div>
    </div>
  )
}