import { ChatBlock } from "./blocks/ChatBlock"
import { useSelector } from "react-redux"
import AddChat from "./AddChat";
import { useTypedSelector } from "../hooks/useTypedSelector";

type ChatListProps = {
    joinRoom: (user: {}, chatID: any) => void;
    closeConnection: () => void;
}

export const ChatList:React.FC<ChatListProps> = ({joinRoom, closeConnection}) => {

	const chatList = useTypedSelector(state => state.chatState.chatList)
    
	return (
		<div className="chat-list">
			<AddChat/>
            {
                chatList.map( (chat) => (
                    <ChatBlock joinRoom={joinRoom} closeConnection={closeConnection} key={chat.id} chatName={chat.users[1].username} chatID={chat.id}/>
                ))
            }
        </div>
    );
}
