import { useActions } from "../hooks/useActions"
import { useTypedSelector } from "../hooks/useTypedSelector"

export const SideBar = () => {
    // const userPhoto = useTypedSelector(state => state.userState.currentUser.avatar);
    const {setProfileOpened} = useActions();
  return (
    <div className="side-bar">
        <div 
            className="user-avatar"
            onClick={() => {setProfileOpened(true)}}
        >
        </div>
    </div>
  )
}
