import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

type UserBlockProps = {
    friend: any;
    closeSearch: () => void;
    joinRoom: (user: {}, chatID: any) => void;
}

export const UserBlock:React.FC<UserBlockProps> = ({joinRoom, friend, closeSearch}) => {

    const chatlist = useTypedSelector(state => state.chatState.chatList);
    const nameList = chatlist.map(chat => chat.users[1].username);
    let user: any  = JSON.parse(localStorage.getItem("user") || "");
    const { creatingChat } = useActions();
    const clickHandler = () => {
        let count = 0;
        for (let index = 0; index < nameList.length; index++) {
            if(nameList[index] === friend.username) {
                count++
            }
        }
        if(count > 0) {
            return
        } else if (count === 0) {
            creatingChat(user.user, friend.id)
        }
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
