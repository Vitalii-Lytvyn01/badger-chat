import React, { useState,useContext, useEffect } from 'react'
import Message from './Message'
import { ChatContext } from '../../context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../misc/firebase';
import { AuthContext } from '../../context/AuthContext';

export default function Messages() {

  const {data} = useContext(ChatContext);
  const {currentUser} = useContext(AuthContext);
  const [messages,setMessages] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db,'chats',data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => unsub()
  },[data.chatId]);

  console.log(data);

  return (
    <div className="chat__messages">
      {
        messages.map((m) => (
          <Message
            key={m.id}
            message={m.text}
            self={currentUser.uid == m.senderId}
            imgUrl={m.img}
            userImg={data.user.photoURL}
        />
        ))
      }
    </div>
  )
}


