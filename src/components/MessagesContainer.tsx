import React from 'react';
import { useEffect } from 'react';
import { Message } from './Message';
type MessagesContainerProps = {
    messages: any[]
}
export const MessagesContainer:React.FC<MessagesContainerProps> = ({messages}) => {
    const messageRef = React.useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (messageRef && messageRef.current) {
            const { scrollHeight, clientHeight } = messageRef.current;
            messageRef.current.scrollTo({ left: 0, top: scrollHeight - clientHeight, behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <div ref={messageRef} className="messages-container" >
        {
            messages.map((message, index) =>
                <Message key={index} message={message}/>
            )
        }
        </div>
    )
}
