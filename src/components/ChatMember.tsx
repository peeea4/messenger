import { convertOnline } from "../helpers/onlineConvert";

interface ChatMemberProps {
    user: any
}

export const ChatMember: React.FC<ChatMemberProps> = ({ user }) => {
    let dateForOutput = convertOnline(user);

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
