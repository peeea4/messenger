import { useEffect, useRef } from 'react';
import { Message } from './Message';

export const MessagesContainer = ({ messages }) => {
    const messageRef = useRef();

    useEffect(() => {
        if (messageRef && messageRef.current) {
            const { scrollHeight, clientHeight } = messageRef.current;
            messageRef.current.scrollTo({ left: 0, top: scrollHeight - clientHeight, behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <div ref={messageRef} className='messages-container' >
        {
            messages.map((message, index) =>
                <Message key={index} message={message}/>
            )
        }
        </div>
    )
}
