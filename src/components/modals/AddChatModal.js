import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { MyButton } from "../MyButton";
import { creatingChat } from "../../store/actions/chatActions";
import { showModal } from "../../store/actions/modalActions";
export const AddChatModal = ({joinRoom}) => {

    const dispatch = useDispatch();
    const [userDestination, setUserDestination] = useState("");
    const user = useSelector(state => state.user);
    const modalAddChat = useSelector(state => state.modalAddChat)
    localStorage.setItem("userName", `${user.username}`);

    const createChat = () => {
        joinRoom(1, user.username, userDestination, null);
        dispatch(creatingChat(user, userDestination));
        dispatch(showModal(!modalAddChat));
    }

    const closeModal = (e) => {
        if (e.target.classList.contains("modal-overlay")) {
            dispatch(showModal(!modalAddChat));
        }
    }
    return (
        <div className="modal-overlay" onClick={(e) => {closeModal(e)}}>
            <div className="modal add-chat-modal">
                <input type="text" placeholder="Введите ID Вашего собеседника" onChange={e => {setUserDestination(e.target.value)}}/>
                <MyButton className="confirm-button button" onClick={() => {createChat()}}>Создать чат</MyButton>
            </div>
        </div>
    );
}
