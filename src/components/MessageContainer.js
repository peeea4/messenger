import { useEffect, useRef } from 'react';

const MessageContainer = ({ messages }) => {
    const messageRef = useRef();

    useEffect(() => {
        if (messageRef && messageRef.current) {
            const { scrollHeight, clientHeight } = messageRef.current;
            messageRef.current.scrollTo({ left: 0, top: scrollHeight - clientHeight, behavior: 'smooth' });
        }
    }, [messages]);

    return <div ref={messageRef} className='message-container' >
        {
            messages.map((m, index) =>
                <div key={index} className={ m.user === localStorage.userName ? "user-message" : "friend-message"}>
                    <div className='message bg-primary'>{m.text}</div>
                    <div className='from-user'>{m.user} {m.timeSent}</div>
                </div>
        )}
    </div>
}

export default MessageContainer;
