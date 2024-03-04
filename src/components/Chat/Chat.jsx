import React, { useState } from 'react'
import './Chat.scss'
import Messages from './Messages'
import Input from './Input'

export const Chat = () => {
  return (
    <div className='chat'>
      <div className="chat__info">John</div>
      <Messages />
      <Input />
    </div>
  )
}
