import React from 'react';
import { useEffect } from 'react';
import { Message } from './Message';

type MessagesContainerProps = {
    messages: any[];
    messagesFromDB: any[];
};

export const MessagesContainer:React.FC<MessagesContainerProps> = ({messagesFromDB, messages}) => {
    const messageRef = React.useRef<HTMLDivElement>(null);
    const finallyArray:any = [];
    finallyArray.push(...messages)
        if(messagesFromDB?.length) {
            finallyArray.unshift(...messagesFromDB)
        }

    useEffect(() => {
        if (messageRef && messageRef.current) {
            const { scrollHeight, clientHeight } = messageRef.current;
            messageRef.current.scrollTo({ left: 0, top: scrollHeight - clientHeight, behavior: 'smooth' });
        }
    }, [messages]);
  
    return (
        <div ref={messageRef} className="messages-container" >
        {
            finallyArray.map((message:any, index:number) =>
                <Message key={index} message={message}/>
            )
        }
        </div>
    )
}
