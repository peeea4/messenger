import {creatingChat} from "../../store/actions/chatActions"
import { useActions } from "../../hooks/useActions";

type UserBlockProps = {
    friend: any;
    closeSearch: () => void;
}

export const UserBlock:React.FC<UserBlockProps> = ({friend, closeSearch}) => {
    let user: any  = JSON.parse(localStorage.getItem("user") || "");
    const { creatingChat } = useActions();
    const clickHandler = () => {
        creatingChat(user.user, friend.id);
        closeSearch();
    }
    return (
        <div onClick={() => {clickHandler()}} className="user-block">
            {
                friend.username
            }
        </div>
    );
}
