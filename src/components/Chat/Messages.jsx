import React from 'react'
import Message from './Message'

export default function Messages() {
  return (
    <div className="chat__messages">
      <Message
        message={"message"}
        self={false}
      />
    </div>
  )
}


