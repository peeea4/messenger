import { useEffect, useRef } from 'react';
import Message from './Message';

const MessageContainer = ({ messages }) => {
    const messageRef = useRef();

    useEffect(() => {
        if (messageRef && messageRef.current) {
            const { scrollHeight, clientHeight } = messageRef.current;
            messageRef.current.scrollTo({ left: 0, top: scrollHeight - clientHeight, behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <div ref={messageRef} className='message-container' >
        {
            messages.map((message, index) =>
                <Message key={index} message={message}/>
            )
        }
        </div>
    )
}

export default MessageContainer;
