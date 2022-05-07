import { ChatBlock } from "./blocks/ChatBlock"
import { useSelector } from "react-redux"
import AddChat from "./AddChat";

export const ChatList = ({joinRoom}) => {

	const chatList = useSelector(state => state.chatStore.chatList)
    
	return (
		<div className="chat-list">
			<AddChat/>
            {
                chatList.map( (chat) => (
                    <ChatBlock joinRoom={joinRoom} key={chat.id} chatID={chat.id}/>
                ))
            }
        </div>
    );
}
