import { useTypedSelector } from "../../hooks/useTypedSelector";

type ChatBlockProps = {
    joinRoom: (user: {}, chatID: any) => void;
    closeConnection: () => void;
    chatName: string;
    chatID: number;
}

export const ChatBlock:React.FC<ChatBlockProps> = ({joinRoom, chatName, chatID, closeConnection}) => {

	const user = useTypedSelector(state => state.userState.currentUser.user);
    
	return (
		<div className="user-tab" onClick={() => {
            closeConnection();
			joinRoom(user, String(chatID));
        }}>
            <div className="user-image-aside"></div>
            <div className="user-content">
                <h4 className="chat-name">{chatName}</h4>
                <p className="user-last-message"></p>
            </div>
		</div>
	);
}
