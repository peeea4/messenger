import { useTypedSelector } from "../hooks/useTypedSelector"
import { useActions } from "../hooks/useActions"
const logo = require("../assets/icons/user.png");
const settings = require("../assets/icons/settings.png");
const contacts = require("../assets/icons/contacts.png");
const exit = require("../assets/icons/exit.png");
export const NavBar = () => {

    const {setProfileOpened, setNavBarOpened, setContactsOpened, getUserListAsync} = useActions();
    const user = useTypedSelector(state => state.userState.currentUserData);
    const userPhoto = useTypedSelector(state => state.userState.currentUserData.profileImageFilePath);
    let avatar = userPhoto ? userPhoto : logo
    const wrapperClickHandler = (e:any) => {
        if(e.target.classList.contains("navbar-wrapper")) {
            setNavBarOpened(false);
        }
    }

    const settingsClickHandler = () => {
        setProfileOpened(true);
        setNavBarOpened(false);
    }

    const contactButtonHandler = () => {
        getUserListAsync()
        setContactsOpened(true);
        setNavBarOpened(false);
    }

    const logOut = () => {
        localStorage.clear();
        window.location.reload()
    }
    
    return (
        <div className="navbar-wrapper" onClick={(e) => wrapperClickHandler(e)}>
            <nav className="navbar">
                <div className="user-block" >
                    <div className="user-avatar"><img src={avatar} alt="" /></div>
                    <h3 className="user-name">{user.username}</h3>
                    <h4 className="user-email">{user.email}</h4>
                </div>
                <div className="settings-block">
                    <div className="settings-tab nav-tab" onClick={() => {settingsClickHandler()}}>
                        <img src={settings} alt="" />
                        <button className="settings-btn btn">Settings</button>
                    </div>
                    <div className="contacts-tab nav-tab" onClick={() => {contactButtonHandler()}}>
                        <img src={contacts}  alt="" />
                        <button className="contacts-btn btn">Contacts</button>
                    </div>
                </div>
                <div className="exit-tab nav-tab">
                    <img src={exit} alt="" />
                    <button onClick={() => logOut()} className="exit-btn">Exit</button>
                </div>
            </nav>
        </div>
    )
}
