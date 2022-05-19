import { ChatMember } from "./ChatMember"

type ConnectedUsersProps = {
    users: any[];
}

export const ConnectedUsers:React.FC<ConnectedUsersProps> = ({users}) => {
    return (
        <div className="user-list">
            {
                users?.map((user: any, index: number) => (
                    user.username != JSON.parse(localStorage.getItem("user") || "").user.username ? 
                    (
                        <ChatMember key={index} user={user}/>
                    )
                    :
                    (
                        null
                    )
                ))
            }
        </div>
    )
}
