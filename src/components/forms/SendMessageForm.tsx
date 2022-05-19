import React, { useState } from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector';

type SendMessageFormProps = {
    sendMessage: (chatID:string, message: {}) => void
}

export const SendMessageForm:React.FC<SendMessageFormProps> = ({ sendMessage }) => {

    const chatID = useTypedSelector(state => state.chatState.chatID);
        
    const [message, setMessage] = useState('');
    
    return (
        <form className="send-message-form"
        onSubmit={e => {
            e.preventDefault();
            if(message.length) {
                sendMessage(String(chatID), message);
                setMessage('');	
            }
        }}>
            <input 
                type="user" placeholder="Write a message..."
                onChange={e => setMessage(e.target.value)} 
                value={message} 
            />
            {/* <button className="send-button button" disabled={!message}>Отправить</button> */}
        </form>
    )
}
