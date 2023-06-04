
import { useState, useEffect, useRef } from 'react'

import actionCable from 'actioncable'

import ChatInput from './ChatInput'

const CableApp = {}
CableApp.cable = actionCable.createConsumer(`${process.env.REACT_APP_WSS_URL}`)

export const Chat = () => {
    const [messages, setMessages] = useState([])
    const endMessageRef = useRef(null)  
  
    useEffect(() => {
      endMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }, [messages])

    useEffect(() => {
      CableApp.cable.subscriptions.create(
        { channel: 'MessagesChannel', },
        { received: (data) => { setMessages([...messages, data.message]) } }
      )
    }, [CableApp.cable.subscriptions, setMessages, messages])

    return (
    <div>
        <div>
          {messages.map((message, index) => {
            return (            
              <div key={index}>
                <p>{message.first_name}: {message.content}</p>
              </div>                      
            )
          })}
          <div ref={endMessageRef} />
        </div>
        <ChatInput messages={messages} setMessages={setMessages} />
      </div>
    )
  }
  
  export default Chat