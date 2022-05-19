import axios from "axios";
import React from "react";
import { useActions } from "../../hooks/useActions"
import { useTypedSelector } from "../../hooks/useTypedSelector";

export const ProfileModal = () => {
	const { setProfileOpened } = useActions();
	const userData = useTypedSelector(state => state.userState.currentUser.user);
	const [selectStatus, setSelectStatus] = React.useState<boolean>(false);
	const [image, setImage] = React.useState<any>(null);
	const [avatar, setAvatar] = React.useState<any>(null);
	console.log(image);


	const profileHandler = (e: any) => {
		if (e.target.classList.contains("profile-modal-wrapper")) {
			setProfileOpened(false);
		}
	};

	const sendFile = React.useCallback(async () => {
		const data = new FormData()
		data.append("image", image[0])
		console.log(data.get("image"))
		const obj = {
			"user": {...userData},
			"user-image": { ...data}
		}
		await axios.put(`https://localhost:44328/users/${userData.id}`, data)
		.then(res => setAvatar(res.data.path))

	}, [image])

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
									: <img onClick={() => { setSelectStatus(!selectStatus) }} className="profile-avatar" src="" alt="" />
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
								<div className="choose-file">
									<input type="file" onChange={(e) => { setImage(e.target.files) }} />
									<button onClick={sendFile}>Change Photo</button>
								</div>
							)
							: null
					}
				</div>
				<div className="profile-settings"></div>
			</div>
		</div>
	)
}
