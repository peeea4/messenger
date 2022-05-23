import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

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
            firendImage = userInChat.profileImageFilePath;
            friendName = userInChat.username;
            friendOnline = (userInChat.isCurrentlyOnline ? "Online" : userInChat.lastOnline);
        }
    });
    
    return (
        <div className="chat-info-modal-wrapper" onClick={e => profileHandler(e)}>
            <div className="chat-info-modal">
                <div className="modal-head">
                    <div className="friend-image">{firendImage}</div>
                    <div className="friend-info">
                        <div className="frined-name">{friendName}</div>
                        <div className="friend-online">{friendOnline}</div>
                    </div>
                </div>
                <div className="modal-main">
                    <div className="chat-messages">{currentChatMessages} messages</div>
                </div>
                <div className="modal-footer"></div>
            </div>
        </div>
    )
}
