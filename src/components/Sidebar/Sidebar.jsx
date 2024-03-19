import React, { useContext, useEffect, useState } from 'react'
import './Sidebar.scss'
import { Navbar } from '../Navbar/Navbar'
import { Search } from '../Search/Search'
import { AuthContext } from '../../context/AuthContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../misc/firebase'
import { ChatContext } from '../../context/ChatContext'

export const Sidebar = () => {
  const [chats, setChats] = useState([]);
  const {currentUser} = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
      setChats(Object.entries(doc.data()));
  });

    return () => {
      unsub();
    }
  },[currentUser.uid])

  function handleSelect(userInfo) {
    dispatch({type: "CHANGE_USER",payload: userInfo})
  }

  console.log(chats);
  return (
    <div className='sidebar'>
      <Navbar/>
      <Search/>
      <div className="chat-list">
        {
          chats.map(chat => 
            <div
              key={chat[0]}
              className="user-chat"
              onClick={() => handleSelect(chat[1].userInfo)}
            >
            <img
              src={chat[1].userInfo.photoURL}
              alt=""
              className="user-chat__image"
            />
            <div className="user-chat__info">
              <div className="display-name">{chat[1].userInfo.displayName}</div>
              <div className="message-preview">{chat[1].lastMessage?.text}</div>
            </div>
          </div>
          )
        }
      </div>
    </div>
  )
}