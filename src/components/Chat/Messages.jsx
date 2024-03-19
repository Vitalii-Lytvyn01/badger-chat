import React, { useState,useContext, useEffect } from 'react'
import Message from './Message'
import { ChatContext } from '../../context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../misc/firebase';

export default function Messages() {

  const {data} = useContext(ChatContext);
  const [messages,setMessages] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db,'chats',data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => unsub()
  },[data.chatId]);

  console.log(messages);

  return (
    <div className="chat__messages">
      {
        messages.map((m) => (
          <Message
            key={m.id}
            message={"message"}
            self={false}
        />
        ))
      }
    </div>
  )
}


