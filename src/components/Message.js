import { ReactionsBar } from "./ReactionsBar";
import { useState } from 'react';

export const Message = ({message}) => {
    const [sliderStatus, setSliderStatus] = useState(false);
    let messageStyle = (message.sender.username === localStorage.userName ? "user-message message" : "friend-message message")
    
    return (
        <div className={messageStyle} onClick={e => {setSliderStatus(!sliderStatus)}}>

            <div className="owner">
                {message.user}
            </div>

            <div className="text">
                {message.text}
            </div>

            <div className="time">
                {message.timeSent}
            </div>

            {
                sliderStatus ? <ReactionsBar /> : null
            }
        </div>
    );
}
