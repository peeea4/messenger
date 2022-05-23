interface ChatMemberProps {
    user: any
}

export const ChatMember: React.FC<ChatMemberProps> = ({ user }) => {
    const currentDate = new Date();
    const date = new Date(Date.parse(user.lastOnline));
    let dateForOutput;

    if (
        currentDate.getFullYear() == date.getFullYear() &&
        currentDate.getMonth() == date.getMonth() &&
        currentDate.getDate() == date.getDate()
    ) {
        dateForOutput = `last seen today at ${date.getHours()}:${date.getMinutes()}`;
    } else if (
        currentDate.getFullYear() == date.getFullYear() &&
        currentDate.getMonth() == date.getMonth() &&
        currentDate.getDate() != date.getDate()
    ) {
        date.toLocaleString('default', { month: 'long' });
        dateForOutput = `last seen ${date.getDate()}, 
            ${date.toLocaleString('en-US', {
                month: 'long',
            })} at ${date.getHours()}:${date.getMinutes()}`;
    }

    return (
        <div className="chat-member">
            <div className="username">{user.username}</div>
            <div className="last-online">
                {
                user?.isCurrentlyOnline ? 
                (
                    <p className="online">Online</p>
                ) 
                : 
                (
                    <p className="offline">{dateForOutput}</p>
                )
                }
            </div>
        </div>
    )
}
