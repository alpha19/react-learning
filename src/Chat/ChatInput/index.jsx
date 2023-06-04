import React, { useState } from 'react'

import { post } from "../../utilities/api"

const ChatInput = ({ messages, setMessages })  => {
  const [chatInput, setChatInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();

    const callback = (data) => { setChatInput('') };
    post("message/publish", { message: {content: chatInput}}, callback); 
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea 
          name="chat_input" 
          value={chatInput}
          rows="2"
          onChange={(e) => setChatInput(e.target.value)} />
        <button>Send</button>
      </form>
    </div>
  )
}

export default ChatInput