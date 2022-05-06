import { useDispatch, useSelector } from "react-redux";
import { creatingChat } from "../../store/actions/chatActions";
export const UserBlock = ({friend}) => {
    const dispatch = useDispatch();
    const store = useSelector(state => state)
    let user = JSON.parse(localStorage.getItem("user"));
    return (
        <div onClick={() => {dispatch(creatingChat(user, friend.id))}} className="user-block">
            {
                friend.username
            }
        </div>
    );
}
