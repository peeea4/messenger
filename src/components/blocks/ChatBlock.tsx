import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

type ChatBlockProps = {
    joinRoom: (user: {}, chatID: any) => void;
    closeConnection: () => void;
    chatName: any;
    chatID: number;
}

export const ChatBlock:React.FC<ChatBlockProps> = ({joinRoom, chatName, chatID, closeConnection}) => {
    
	const user = useTypedSelector(state => state.userState.currentUser.user);
    
    const {setChatID, setChatStatus} = useActions();
	
    return (
		<div className="user-tab" onClick={() => {
            closeConnection();
			joinRoom(user, String(chatID));
            setChatStatus(true);
            setChatID(chatID);
        }}>
            <div className="user-image-aside"></div>
            <div className="user-content">
                <h4 className="chat-name">{chatName}</h4>
                <p className="user-last-message"></p>
            </div>
		</div>
	);
}
