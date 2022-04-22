import { useState } from 'react'
import { MyButton } from './MyButton'

export const SendMessageForm = ({ sendMessage }) => {
    const [message, setMessage] = useState('')
    return (
        <form className="send-message-form"
        onSubmit={e => {
            e.preventDefault();
            sendMessage(message);
            setMessage('');
        }}>
            <input 
                type="user" placeholder="message..."
                onChange={e => setMessage(e.target.value)} 
                value={message} 
            />
            <MyButton className="send-button button" disabled={!message}>Send</MyButton>
       </form>
    )

}
