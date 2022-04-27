import { useDispatch } from "react-redux";
const AddChat = () => {
	const dispatch = useDispatch()
    return (
		<div onClick={() => { dispatch(creatingChat(user.username)) }}>
            Добавить чат
        </div>
    );
}

export default AddChat;
