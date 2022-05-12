type MessageProps = {
    message: any;   
}

export const Message:React.FC<MessageProps> = ({message}) => {

    // let messageStyle = (message.sender.username === JSON.parse(localStorage.getItem("user") || "").username ? "user-message message" : "friend-message message");
    let messageStyle = "message";
    return (
        <div className={messageStyle}>

            {/* <div className="owner">
                {message.sender.username}
            </div> */}

            <div className="text">
                {message.text}
            </div>

            <div className="time">
                {message.timeSent}
            </div>

        </div>
    );
}
