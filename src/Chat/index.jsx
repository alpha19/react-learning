
import { useState, useEffect, useRef } from 'react'

import Alert from 'react-bootstrap/Alert';
import Offcanvas from 'react-bootstrap/Offcanvas';
import actionCable from 'actioncable'

import ChatInput from './ChatInput'

const CableApp = {}
CableApp.cable = actionCable.createConsumer(`${process.env.REACT_APP_WSS_URL}`)

export const Chat = ({ showChat, setShowChat}) => {
    const [messages, setMessages] = useState([])

    useEffect(() => {
      CableApp.cable.subscriptions.create(
        { channel: 'MessagesChannel', },
        { received: (data) => {
          const newMessage = (
            <Alert key={messages.length}>
              {data.message.first_name}: {data.message.content}
            </Alert>
          );         
          setMessages([...messages, newMessage]); 
          } 
        }
      );
    }, [CableApp.cable.subscriptions, setMessages, messages])

    return (
      <Offcanvas show={showChat} onHide={() => setShowChat(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Chat</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {messages}
          <ChatInput messages={messages} setMessages={setMessages} />
        </Offcanvas.Body>
      </Offcanvas>
    );
  }
  
  export default Chat