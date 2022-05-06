export const Message = ({message}) => {

    let messageStyle = (message.sender.username === localStorage.userName ? "user-message message" : "friend-message message");

    return (
        <div className={messageStyle}>

            <div className="owner">
                {message.sender.username}
            </div>

            <div className="text">
                {message.text}
            </div>

            <div className="time">
                {message.timeSent}
            </div>
        </div>
    );
}
