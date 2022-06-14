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
    console.log(nameList);
    
    let user: any  = JSON.parse(localStorage.getItem("user") || "");
    const { creatingChat } = useActions();

    const clickHandler = (e: any) => {
        
        let count = 0;
        for (let index = 0; index < nameList.length; index++) {
            if(nameList[index] === e.target.innerHTML) {
                count++
            }
        }
        if(count > 0) {
            return
        } else {
            creatingChat(user.user, friend.id)
        }
        closeSearch();
    }
    
    return (
        <div onClick={(e) => {clickHandler(e)}} className="user-block">
            {
                friend.username
            }
        </div>
    );
}
