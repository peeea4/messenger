import { UserTab } from "./UserTab";
import { useSelector } from "react-redux"
import AddChat from "./AddChat";

export const ChatList = () => {
    const chatList = useSelector(state => state.chatList)
    
	return (
		<div className="chat-list">
			<AddChat/>
            {
                chatList.map( (chat) => (
                    <UserTab key={chat.id} chatID={chat.id}/>
                ))
            }
        </div>
    );
}
