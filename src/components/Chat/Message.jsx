import React, { useContext } from 'react'
import classNames from 'classnames';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

export default function Message({message, self}) {

  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  return (
    <div className={classNames("message", {self: self})}>
      <img
        src="https://images.pexels.com/photos/1136575/pexels-photo-1136575.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="User"
        className="message__img"
      />
      <div className="message__content">
        {message}
      </div>
    </div>
  )
}
