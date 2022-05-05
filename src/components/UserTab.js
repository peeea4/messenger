import { useSelector, useDispatch } from "react-redux"
import { getingMessages } from "../store/actions/messagesActions";

export const UserTab = ({joinRoom, chatID, friendID}) => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    console.log(friendID);

	return (
		<div className="user-tab" onClick={() => {
            dispatch(getingMessages(chatID));
            joinRoom(1, user.username, friendID, null)
        }}>
            <div className="user-image-aside"></div>
            <div className="user-content">
                <h4 className="chat-name">{chatID}</h4>
                <p className="user-last-message"></p>
            </div>
		</div>
	);
}
