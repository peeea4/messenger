import axios from "axios";
import React, { useRef } from "react";
import { useActions } from "../../hooks/useActions"
import { useTypedSelector } from "../../hooks/useTypedSelector";
const logo = require("../../assets/icons/user.png");
export const ProfileModal = () => {
    
	const { setProfileOpened } = useActions();
    const state = useTypedSelector(state => state)
	const userData = useTypedSelector(state => state.userState.currentUser.user);
    console.log(state);
    
	const [selectStatus, setSelectStatus] = React.useState<boolean>(false);
	const [image, setImage] = React.useState<any>(null);
	const [avatar, setAvatar] = React.useState<any>(null);

	const profileHandler = (e: any) => {
		if (e.target.classList.contains("profile-modal-wrapper")) {
			setProfileOpened(false);
		}
	};

    const form = useRef<HTMLFormElement | any>(null)

	const sendFile = React.useCallback(async (e: any) => {
        e.preventDefault()
		const data = new FormData(form.current);
		data.set("image", image[0]);
        data.set("chats", JSON.stringify(userData.chats));
        data.set("email", userData.email);
        data.set("id", userData.id);
        data.set("messages", JSON.stringify(userData.messages));
        data.set("password", userData.password);
        data.set("username", userData.username);
		await axios.put(`https://localhost:44328/users/${userData.id}`, data)
	}, [image, userData])

	return (
		<div className="profile-modal-wrapper" onClick={e => { profileHandler(e) }}>
			<div className="profile-modal">
				<div className="profile-modal-header">
					<h2 className="profile-title">User Profile</h2>
				</div>
				<div className="user-info">
					<div className="profile-main-info">
						<div className="profile-avatar-block">
							{
								avatar
									? <img onClick={() => { setSelectStatus(!selectStatus) }} className="profile-avatar" src={`${avatar}`} alt="" />
									: <img onClick={() => { setSelectStatus(!selectStatus) }} className="profile-avatar" src={logo} alt="" />
							}
						</div>
						<div className="profile-description">
							<h2 className="username">{userData.username}</h2>
							<h4 className="user-email">{userData.email}</h4>
						</div>
					</div>
					{
						selectStatus ?
							(
								<form ref={form} className="choose-file">
									<input type="file" onChange={(e) => { setImage(e.target.files) }} />
									<button onClick={(e) => {sendFile(e)}}>Change Photo</button>
								</form>
							)
							: null
					}
				</div>
				<div className="profile-settings"></div>
			</div>
		</div>
	)
}
