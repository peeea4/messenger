import { useState } from 'react'
import { useSelector } from 'react-redux'

export const SendMessageForm = ({ sendMessage }) => {
    const chatID = useSelector(state => state.chatStore.chatID);
	
    const [message, setMessage] = useState('');
    return (
        <form className="send-message-form"
        onSubmit={e => {
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
