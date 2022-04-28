import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../store/actions/modalActions";
const AddChat = () => {
    const modalAddChat = useSelector(state => state.modalAddChat)
	const dispatch = useDispatch()
    
    return (
		<div className="add-chat" onClick={() => {dispatch(showModal(!modalAddChat))}}>
            Добавить чат
        </div>
    );
}

export default AddChat;
