import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext';

export default function Input(props) {

  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  return (
    <div className="chat__input">
      <input
        type="text"
        name=""
        id=""
        className="message-input"
        placeholder='Type something...'
      />
      <div className="buttons-container">
        <input
          style={{display: 'none'}}
          type="file"
          name="upload-file"
          id="upload-file"
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
        <button>Send</button>
      </div>
    </div>
  )
}