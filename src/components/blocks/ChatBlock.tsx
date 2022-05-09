import { useTypedSelector } from "../../hooks/useTypedSelector";

type ChatBlockProps = {
    joinRoom: (user: {}, chatID: any) => void;
    chatID: any;
}

export const ChatBlock:React.FC<ChatBlockProps> = ({joinRoom, chatID}) => {

	const user = useTypedSelector(state => state.userState.currentUser.user);
    const state = useTypedSelector(state => state);
    console.log(state);
    
    
    
	return (
		<div className="user-tab" onClick={() => {
			joinRoom(user, String(chatID));
        }}>
            <div className="user-image-aside"></div>
            <div className="user-content">
                <h4 className="chat-name">{chatID}</h4>
                <p className="user-last-message"></p>
            </div>
		</div>
	);
}
