import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { UserBlock } from "./blocks/UserBlock";
import { getUserListAsync } from "../store/actions/userActions";
const AddChat = () => {
    const userList = useSelector(state => state.user.userList)
    const dispatch =useDispatch();
    const [searchUser, setSearchValue] = useState("");
    const [searchOpened, setSearchOpened] = useState(false);
    const filteredUsers = userList?.filter( user => {
        return user.username.toLowerCase().includes(searchUser.toLowerCase())
    });
    return (
		<div className="add-chat">
            <input 
                type="text" 
                placeholder="Search"
                className="search-input" 
                onChange={ e => setSearchValue(e.target.value) } 
                onFocus={ () => setSearchOpened(true) } 
            />
            {
                searchOpened ? 
                (
                    <div className="all-users">
                        {
                            filteredUsers?.map(friend => <UserBlock friend={friend} key={friend.id}/>)
                        }
                    </div>
                )
                :
                (
                    null
                )
                
            }
        </div>
    );
}

export default AddChat;
