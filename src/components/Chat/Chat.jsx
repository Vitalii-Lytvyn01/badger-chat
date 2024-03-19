import React, { useState,useContext } from 'react'
import './Chat.scss'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../../context/ChatContext'


export const Chat = () => {
  const {data} = useContext(ChatContext);

  return (
    <div className='chat'>
      <div className="chat__info">{data.user?.displayName}</div>
      <Messages />
      <Input />
    </div>
  )
}
