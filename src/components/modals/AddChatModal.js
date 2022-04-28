import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { MyButton } from "../MyButton";
import { creatingChat } from "../../store/actions/chatActions";
export const AddChatModal = ({joinRoom}) => {
    const dispatch = useDispatch();
    const [userDestination, setUserDestination] = useState("");
    const user = useSelector(state => state.user);
    localStorage.setItem("userName", `${user.username}`);
    const createChat = () => {
        joinRoom(1, user.username, userDestination, null);
        dispatch(creatingChat(user, userDestination));
    }
    return (
        <div className="modal-overlay">
            <div className="modal add-chat-modal">
                <input type="text" placeholder="Введите ID Вашего собеседника" onChange={e => {setUserDestination(e.target.value)}}/>
                <MyButton className="confirm-button button" onClick={() => {createChat()}}>Создать чат</MyButton>
            </div>
        </div>
    );
}
