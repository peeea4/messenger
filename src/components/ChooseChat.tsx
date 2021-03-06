import { useEffect } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";

type ChooseChatProps = {
    joinRoom: (user: any, chatId: any) => void;
}

export const ChooseChat:React.FC<ChooseChatProps> = ({joinRoom}) => {

	const user = useTypedSelector(state => state.userState.currentUser.user);

    useEffect(() => {
        joinRoom(user, "0");
      }, []);

    return (
        <div className="choose-chat">
            <p>Select a chat to start messaging</p>
        </div>
    );
}

