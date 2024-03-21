import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext';
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../../misc/firebase';
import { v4 as uuidGen } from 'uuid';
import { storage } from '../../misc/firebase';
import { uploadBytesResumable } from 'firebase/storage';

export default function Input(props) {
  const [text,setText] = useState("");
  const [image,setImage] = useState(null);

  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  async function handleSend() {
    if(image) {
      const storageRef = ref(storage, uuidGen);

      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on('state_changed',
      (snapshot) => {

      },
      (error) => {
        console.log(error);
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {

        await updateDoc(doc(db,"chats", data.chatId), {
          messages: arrayUnion({
            id:  uuidGen(),
            text,
            senderId: currentUser.uid,
            date:  Timestamp.now(),
            img: downloadURL
          })
        })
      });
    }
  );

    } else {
      await updateDoc(doc(db,"chats", data.chatId), {
        messages: arrayUnion({
          id:  uuidGen(),
          text,
          senderId: currentUser.uid,
          date:  Timestamp.now(),
        })
      })
    }

    setText("");
    setImage(null);

    await updateDoc(doc(db,"userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text
      },
      [data.chatId+'.date']: serverTimestamp()
    })

    console.log(data)

    await updateDoc(doc(db,"userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text
      },
      [data.chatId+'.date']: serverTimestamp()
    })
  }

  return (
    <div className="chat__input">
      <input
        type="text"
        name=""
        id=""
        className="message-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='Type something...'
      />
      <div className="buttons-container">
        <input
          style={{display: 'none'}}
          type="file"
          name="upload-file"
          id="upload-file"
          onChange={(e) => setImage(e.target.flies[0])}
        />
        <label htmlFor="upload-file" >
          <div className="button-icon upload-file"></div>
        </label>
        <input
          style={{display: 'none'}}
          type="file"
          name="upload-image"
          id="upload-image"
          accept="image/*"
        />
        <label htmlFor="upload-image">
          <div className="button-icon upload-image"></div>
        </label>
        <button
          onClick={() => handleSend()}
        >Send</button>
      </div>
    </div>
  )
}