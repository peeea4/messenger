import { useTypedSelector } from "../hooks/useTypedSelector"
import { useActions } from "../hooks/useActions"

export const NavBar = () => {

    const {setProfileOpened, setNavBarOpened} = useActions();
    const user = useTypedSelector(state => state.userState.currentUser.user);
    const userPhoto = useTypedSelector(state => state.userState.currentUserData.profileImageFilePath);
    const wrapperClickHandler = (e:any) => {
        if(e.target.classList.contains("navbar-wrapper")) {
            setNavBarOpened(false);
        }
    }

    const avatarClickHandler = (e:any) => {
        setProfileOpened(true);
        setNavBarOpened(false);
    }
    
    return (
        <div className="navbar-wrapper" onClick={(e) => wrapperClickHandler(e)}>
            <nav className="navbar">
                <div className="user-block" onClick={(e) => {avatarClickHandler(e)}}>
                    <div className="user-avatar"><img src={userPhoto} alt="" /></div>
                    <h3 className="user-name">{user.username}</h3>
                    <h4 className="user-email">{user.email}</h4>
                </div>
            </nav>
        </div>
    )
}
