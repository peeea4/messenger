import { useActions } from "../../hooks/useActions"
import { useTypedSelector } from "../../hooks/useTypedSelector";

export const ProfileModal = () => {
    const {setProfileOpened} = useActions();
    const userData = useTypedSelector(state => state.userState.currentUser.user)
    console.log();
    
    const profileHandler = (e:any) => {
        if(e.target.classList.contains("profile-modal-wrapper")) {
            setProfileOpened(false);
        }
    };

  return (
    <div className="profile-modal-wrapper" onClick={e => {profileHandler(e)}}>
        <div className="profile-modal">
            <header className="profile-modal-header">
                <h2 className="profile-title">User Profile</h2>
                {/* <button className="profile-close">X</button> */}
            </header>
            <div className="user-info">
                <div className="profile-avatar"></div>
                <div className="profile-description">
                    <h2 className="username">{userData.username}</h2>
                    <h3 className="user-title"></h3>
                    <h4 className="user-email">{userData.email}</h4>
                </div>
            </div>
            <div className="profile-settings"></div>
        </div>
    </div>
  )
}
