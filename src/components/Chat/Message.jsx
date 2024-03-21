import React, { useContext } from 'react'
import classNames from 'classnames';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

export default function Message({message, self, imgUrl,userImg}) {

  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  return (
    <div className={classNames("message", {self: self})}>
      <img
        src={userImg}
        alt="User"
        className="message__img"
      />
      <div className="message__content">
        {message}
      </div>
    </div>
  )
}
