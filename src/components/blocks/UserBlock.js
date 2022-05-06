import { useDispatch } from "react-redux";
import { creatingChat } from "../../store/actions/chatActions";
export const UserBlock = ({friend, closeSearch}) => {
    const dispatch = useDispatch();
    let user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    const clickHandler = () => {
        console.log(user.username);
        dispatch(creatingChat(user, friend.id))
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
