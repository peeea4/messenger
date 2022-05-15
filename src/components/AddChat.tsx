import { useState } from "react";
import { UserBlock } from "./blocks/UserBlock";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
type AddChatProps = {
    joinRoom: (user: {}, chatID: any) => void;
}
export const AddChat:React.FC<AddChatProps> = ({ joinRoom }) => {
    const {setSearchOpened} = useActions();
	const userList = useTypedSelector(state => state.userState.userList);
    const searchOpened = useTypedSelector(state => state.modalState.searchIsOpened);   
    const [searchUser, setSearchValue] = useState("");
    const filteredUsers = userList?.filter( user => {
        return (user.username.toLowerCase().includes(searchUser.toLowerCase()) && user.username !== JSON.parse(localStorage.getItem("user") || "").user.username && user.username )
    });
    const closeSearch = () => {
        setSearchOpened(false)
    }
    return (
		<div className="add-chat">
            <div 
                className="search-block"
                onClick={ e => setSearchOpened(true) }>
                <input 
                    type="text" 
                    placeholder="Search"
                    className="search-input" 
                    onChange={ e => setSearchValue(e.target.value) } 
                />
            </div>
            {
                searchOpened ? 
                (
                    <div className="all-users">
                        {
                            filteredUsers?.map(friend => <UserBlock joinRoom={joinRoom} friend={friend} key={friend.id} closeSearch={closeSearch}/>)
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
