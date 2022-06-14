import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { User } from "../User"
const closeIcon = require("../../assets/icons/close-cross.png");

export const ContactList = () => {
    const userList = useTypedSelector(state => state.userState.userList)
    const { setContactsOpened } = useActions();
	const contactHandler = (e: any) => {
		if (e.target.classList.contains("contact-list-wrapper") || e.target.classList.contains("close-modal-img")) {
			setContactsOpened(false); 
		}
	};
    return (
        <div className="contact-list-wrapper" onClick={e => { contactHandler(e) }}>
            <div className="contact-modal">
                <div className="contact-modal-header">
                    <h2 className="contact-title">Settings</h2>
                    <button className="close-modal"><img className="close-modal-img" src={closeIcon} alt="" /></button>
                </div>
                <div className="contact-list">
                    {
                        userList.map( user => (
                            <User key={user.id} user={user}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
