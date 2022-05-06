import { ChatBlock } from "./blocks/ChatBlock"
import { useSelector } from "react-redux"
import AddChat from "./AddChat";

export const ChatList = ({joinRoom}) => {

    const chatList = useSelector(state => state.chats.chatList)
    const user = useSelector(state => state.user)
    
	return (
		<div className="chat-list">
			<AddChat/>
            {
                chatList.map( (chat) => (
                    <ChatBlock joinRoom={joinRoom} key={chat.id} chatID={chat.id} friendID={chat.users.filter( (element) => element.id !== user.id)}/>
                ))
            }
        </div>
    );
}
