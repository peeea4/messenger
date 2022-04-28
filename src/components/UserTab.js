import { useSelector, useDispatch } from "react-redux"
import { getingMessages } from "../store/actions/messagesActions";

export const UserTab = ({chatID}) => {

    const username = useSelector(state => state.user.username);
    const dispatch = useDispatch();

	return (
		<div className="user-tab" onClick={() => {
            dispatch(getingMessages(chatID));
            console.log("inusertab");
        }}>
            <div className="user-image-aside"></div>
            <div className="user-content">
                <h4 className="user-name">{username}</h4>
                <p className="user-last-message"></p>
            </div>
		</div>
	);
}
