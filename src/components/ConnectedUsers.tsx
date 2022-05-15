import { useTypedSelector } from "../hooks/useTypedSelector"
import { ChatMember } from "./ChatMember"

export const ConnectedUsers:React.FC = () => {
    return (
        <div className="user-list">
            {
                // users.map((user: any, index: number) => (
                //     user.username != JSON.parse(localStorage.getItem("user") || "") ? 
                //     (
                //         <ChatMember key={index} user={user}/>
                //     )
                //     :
                //     (
                //         null
                //     )
                // ))
            }
        </div>
    )
}
