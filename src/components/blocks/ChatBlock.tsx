import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

type ChatBlockProps = {
    joinRoom: (user: {}, chatID: any, chat:any) => void;
    closeConnection: () => void;
    chatName: any;
    chatID: number;
    chat:any;
    chatImage: string;
}

export const ChatBlock:React.FC<ChatBlockProps> = ({chat, joinRoom, chatName, chatImage, chatID, closeConnection}) => {
    
	const user = useTypedSelector(state => state.userState.currentUser.user);    
    let lastMessage = chat.messages[chat.messages.length - 1]?.text;
    const {setChatID, setChatStatus, getChatById} = useActions();
    
    return (
		<div className="user-tab" onClick={() => {
            getChatById(chatID);
            closeConnection();
			joinRoom(user, String(chatID), chat);
            setChatStatus(true);
            setChatID(chatID);
            getChatById(chatID);
        }}>
            <div className="user-image-aside"><img src="{chatImage}" alt="" /></div>
            <div className="user-content">
                <h4 className="chat-name">{chatName}</h4>
                <p className="user-last-message">{lastMessage}</p>
            </div>
		</div>
	);
}
