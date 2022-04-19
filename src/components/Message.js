import ReactionsBar from "./ReactionsBar";
import { useState } from 'react';

const Message = ({message}) => {
    const [sliderStatus, setSliderStatus] = useState(false);
    let className1 = (message.user === localStorage.userName ? "user-message chat-message" : "friend-message chat-message")
    return (
        <div className={className1} onClick={e => {setSliderStatus(!sliderStatus)}}>
            <div className='message'>
                {message.text}
            </div>
            <div className='from-user'>
                {
                    `${message.user} ${message.timeSent}`
                }
            </div>
            {
                sliderStatus ? <ReactionsBar /> : null
            }
        </div>
    );
}

export default Message;
