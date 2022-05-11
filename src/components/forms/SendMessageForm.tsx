import React, { useState } from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector';
type SendMessageFormProps = {
    sendMessage: (chatID:string, message: {}) => void
}
export const SendMessageForm:React.FC<SendMessageFormProps> = ({ sendMessage }) => {
    const chatID = useTypedSelector(state => state.chatState.chatID);
    const state = useTypedSelector(state => state);
    const [message, setMessage] = useState('');
    return (
        <form className="send-message-form"
        onSubmit={e => {
            console.log(chatID, "chat id");
            
            e.preventDefault();
            sendMessage(String(chatID), message);
            setMessage('');	
        }}>
            <input 
                type="user" placeholder="message..."
                onChange={e => setMessage(e.target.value)} 
                value={message} 
            />
            <button className="send-button button" disabled={!message}>Отправить</button>
        </form>
    )
}
