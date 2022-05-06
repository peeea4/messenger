export const Message = ({message}) => {

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
