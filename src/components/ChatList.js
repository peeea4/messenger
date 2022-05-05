import { UserTab } from "./UserTab";
import { useSelector } from "react-redux"
import AddChat from "./AddChat";

export const ChatList = ({joinRoom}) => {
    const chatList = useSelector(state => state.chatList)
    const user = useSelector(state => state.user)
    console.log(chatList);
    
	return (
		<div className="chat-list">
			<AddChat/>
            {
                chatList.map( (chat) => (
                    <UserTab joinRoom={joinRoom} key={chat.id} chatID={chat.id} friendID={chat.users.filter( (element) => element.id !== user.id)}/>
                ))
            }
        </div>
    );
}
