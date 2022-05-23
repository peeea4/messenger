import { ChatBlock } from "./blocks/ChatBlock";
import { AddChat } from "./AddChat";
import { useTypedSelector } from "../hooks/useTypedSelector";

type ChatListProps = {
    joinRoom: (user: {}, chatID: any) => void;
}

export const ChatList:React.FC<ChatListProps> = ({joinRoom}) => {

	const chatList = useTypedSelector(state => state.chatState.chatList);
    
	return (
		<div className="chat-list">
			<AddChat joinRoom={joinRoom}/>
            {
                chatList.map( (chat) => (
                    <ChatBlock chat={chat} joinRoom={joinRoom} key={chat.id} chatID={chat.id}/>
                ))
            }
        </div>
    );
}
