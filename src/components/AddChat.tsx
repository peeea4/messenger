import { useState } from "react";
import { UserBlock } from "./blocks/UserBlock";
import { useTypedSelector } from "../hooks/useTypedSelector";
const AddChat = () => {
	const userList = useTypedSelector(state => state.userState.userList)
    const [searchUser, setSearchValue] = useState("");
    const [searchOpened, setSearchOpened] = useState(false);
    const filteredUsers = userList?.filter( user => {
        return user.username.toLowerCase().includes(searchUser.toLowerCase())
    });
    const closeSearch = () => {
        setSearchOpened(false)
    }
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
                            filteredUsers?.map(friend => <UserBlock friend={friend} key={friend.id} closeSearch={closeSearch}/>)
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
