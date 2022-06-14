import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
const logo = require("../../assets/icons/user.png");
type ChatBlockProps = {
    joinRoom: (user: {}, chatID: any, chat:any) => void;
    chatID: number;
    chat:any;
};

export const ChatBlock:React.FC<ChatBlockProps> = ({chat, joinRoom, chatID}) => {
	const user = useTypedSelector(state => state.userState.currentUser);

    let chatImage;
    let chatName;

    chat.users.forEach((userInChat: any) => {
        if(userInChat.username !== user.user.username) {
            userInChat.profileImageFilePath ? chatImage = userInChat.profileImageFilePath : chatImage = logo
            chatName = userInChat.username;
        }
    });
    
    let lastMessage = chat.messages[chat.messages.length - 1]?.text;
    const {setChatID, setChatStatus, getChatById} = useActions();
    
    return (
		<div className="user-tab" onClick={() => {
            getChatById(chatID);
			joinRoom(user, String(chatID), chat);
            setChatStatus(true);
            setChatID(chatID);
        }}>
            <div className="user-image-aside"><img src={chatImage} alt="" /></div>
            <div className="user-content">
                <h4 className="chat-name">{chatName}</h4>
                <p className="user-last-message">{lastMessage}</p>
            </div>
		</div>
	);
}
