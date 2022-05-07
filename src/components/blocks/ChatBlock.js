import { useSelector, useDispatch } from "react-redux"
import { setChatID } from "../../store/actions/chatActions";
export const ChatBlock = ({joinRoom, chatID}) => {
	const user = useSelector(state => state.userStore.currentUser.user);
    const dispatch = useDispatch();

	return (
		<div className="user-tab" onClick={() => {
            dispatch(setChatID(chatID));
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
