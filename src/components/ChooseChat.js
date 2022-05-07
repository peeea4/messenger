import { useSelector } from "react-redux";

export const ChooseChat = ({joinRoom}) => {
	const user = useSelector(state => state.userStore.currentUser.user);
    joinRoom(user, String(0))
    return (
        <div className="choose-chat">
            <p>Выберите, кому хотели бы написать</p>
        </div>
    );
}

