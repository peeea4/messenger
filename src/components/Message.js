import ReactionsBar from "./ReactionsBar";
import { useState } from 'react';

const Message = ({message}) => {
    const [sliderStatus, setSliderStatus] = useState(false);
    let className1 = (message.user === localStorage.userName ? "user-message message" : "friend-message message")
    return (
        <div className={className1} onClick={e => {setSliderStatus(!sliderStatus)}}>

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

export default Message;
