interface ChatMemberProps {
    user: any
}

export const ChatMember: React.FC<ChatMemberProps> = ({ user }) => {
    return (
        <div className="chat-member">
            {user.username}
        </div>
    )
}
