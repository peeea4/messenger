import { convertOnline } from "../../helpers/onlineConvert";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
const logo = require("../../assets/icons/user.png");

type ChatInfoProps = {
    messages: any[];
}

export const ChatInfo:React.FC<ChatInfoProps> = ({messages}) => {

    const { setChatInfoOpened } = useActions();

    const profileHandler = (e: any) => {
		if (e.target.classList.contains("chat-info-modal-wrapper")) {
			setChatInfoOpened(false);
		}
	};
    const currentChat = useTypedSelector(state => state.chatState.currentChat);
    const currentChatMessages = useTypedSelector(state => state.chatState.currentChat.messages).length + messages.length - 1;
    const user = useTypedSelector(state => state.userState.currentUser);
    
    let firendImage;
    let friendName;
    let friendOnline;

    currentChat.users.forEach((userInChat: any) => {
        if(userInChat.username !== user.user.username) { 
            firendImage = userInChat.profileImageFilePath ? userInChat.profileImageFilePath : logo
            friendName = userInChat.username;
            let lastOnline = convertOnline(userInChat);
            friendOnline = <h4 className={userInChat.isCurrentlyOnline ? "friend-status online" : "friend-status ofline"}>{lastOnline}</h4>       
        }
    });
    
    return (
        <div className="chat-info-modal-wrapper" onClick={e => profileHandler(e)}>
            <div className="chat-info-modal">
                <div className="modal-header">
                    <h2 className="title">Chat Info</h2>
                </div>
                <div className="head-info">
                    <img src={firendImage} alt={`${friendName} avatar`} className="friend-image" />
                    <div className="friend-bio">
                        <h2 className="friend-name">{friendName}</h2>
                        { friendOnline }
                    </div>
                </div>
                <div className="stats">
                    <div className="messages">{currentChatMessages} messages</div>
                </div>
                <div className="modal-footer"></div>
            </div>
        </div>
    )
}