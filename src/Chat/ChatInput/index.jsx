import React, { useState } from 'react'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { post } from "../../utilities/api"

const ChatInput = ({ messages, setMessages })  => {
  const [chatInput, setChatInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();

    const callback = (data) => { setChatInput('') };
    post("message/publish", { message: {content: chatInput}}, callback); 
  };
  return (
    <>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Enter Message:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Message"
            name="message"
            onChange={(e) => setChatInput(e.target.value)}
            value={chatInput} 
          />
        </Form.Group>
      </Form>
      <Button variant="primary" onClick={handleSubmit}>
        Send
      </Button>
    </>
  );
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