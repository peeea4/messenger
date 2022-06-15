import React, { useEffect, useState } from "react";
import { useActions } from "../../hooks/useActions"
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { EditProfile } from "../EditProfile";
const logo = require("../../assets/icons/user.png");
const closeIcon = require("../../assets/icons/close-cross.png");
const userSettings = require("../../assets/icons/user-settings.png");

export const ProfileModal = () => {
    
	const { setProfileOpened, getUserById } = useActions();
	const userData = useTypedSelector(state => state.userState.currentUser.user);
    const currentUserData = useTypedSelector(state => state.userState.currentUserData);
    useEffect(() => {
        getUserById(userData.id)
    }, [])
	const [selectStatus, setSelectStatus] = React.useState<boolean>(false);

	const [avatar, setAvatar] = React.useState<any>(currentUserData.profileImageFilePath);
    const [isEdit, setIsEdit] = useState(false)

	const profileHandler = (e: any) => {
		if (e.target.classList.contains("profile-modal-wrapper") || e.target.classList.contains("close-modal-img")) {
			setProfileOpened(false);
		}
	};

	return (
		<div className="profile-modal-wrapper" onClick={e => { profileHandler(e) }}>
			{
                !isEdit ? 
                (
                    <div className="profile-modal">
                        <div className="profile-modal-header">
                            <h2 className="profile-title">Settings</h2>
                            <button className="close-modal"><img className="close-modal-img" src={closeIcon} alt="" /></button>
                        </div>
                        <div className="user-info">
                            <div className="profile-main-info">
                                <div className="profile-avatar-block">
                                    {
                                        avatar
                                            ? <img className="profile-avatar" src={avatar} alt="" />
                                            : <img className="profile-avatar" src={logo} alt="" />
                                    }
                                </div>
                                <div className="profile-description">
                                    <h2 className="username">{currentUserData.username}</h2>
                                    <h4 className="user-email">{currentUserData.email}</h4>
                                </div>
                            </div>
                        </div>
                        <div className="profile-settings">
                            <div className="edit-profile-btn" onClick={() => setIsEdit(!isEdit)}>
                                <img src={userSettings} alt="" />
                                <p>Edit profile</p>
                            </div>
                        </div>
                    </div>
                )
                :
                (
                    <EditProfile 
                        onChangePhoto={setSelectStatus} 
                        avatar={avatar} 
                        selectPhotoStatus={selectStatus} 
                        goBack={setIsEdit}
                        setAvatar={setAvatar} 
                    />
                )
            }
		</div>
	)
}
