import React, { useRef } from "react";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";

const logo = require("../assets/icons/user.png");
const closeIcon = require("../assets/icons/close-cross2.png");
const goBackImg = require("../assets/icons/go-back.png");

const editName = require("../assets/icons/editName.png");
const changeAge = require("../assets/icons/changeAge.png");
const editEmail = require("../assets/icons/editEmail.png");

type EditProfileProps = {
    onChangePhoto: (value: any) => void;
    avatar: any;
    selectPhotoStatus: boolean;
    goBack: (value: any) => void;
    setAvatar: (value: any) => void;
}

export const EditProfile:React.FC<EditProfileProps> = ({onChangePhoto, avatar, selectPhotoStatus, goBack, setAvatar}) => {
    const userData = useTypedSelector(state => state.userState.currentUserData);

    const userOnline = useTypedSelector(state => state.userState.userOnline);
    
    const [image, setImage] = React.useState<any>(null);
    const [userName, setUserName] = React.useState<any>(userData.username);
    const [userEmail, setUserEmail] = React.useState<any>(userData.email);
    const [userAge, setUserAge] = React.useState<any>(userData.age);
    const [userBio, setUserBio] = React.useState<any>(userData.about);

    const { updateUser,  } = useActions();

    const form = useRef<HTMLFormElement | any>(null);
    
	const sendFile = (e: any) => {
        e.preventDefault()
		const data = new FormData(form.current);
		data.set("image", image);
        data.set("chats", JSON.stringify(userData.chats));
        data.set("email", userData.email);
        data.set("id", userData.id);
        data.set("messages", JSON.stringify(userData.messages));
        data.set("password", userData.password);
        data.set("username", userName);
        data.set("about", userBio);
        data.set("age", userAge);
        updateUser(userData.id, data);     
	}

    const imageHandler = (filesArray: any) => {
        setImage(filesArray[0])
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2) {
                setAvatar(reader.result)
            }
        }
        reader.readAsDataURL(filesArray[0])
    }
    return (
        <div className="edit-profile-modal">
            <div className="edit-profile-header">
                <button className="go-back"><img className="go-back-img" src={goBackImg} alt="" onClick={() => goBack(false)} /></button>
                <h2 className="profile-title">Info</h2>
                <button className="close-modal"><img className="close-modal-img" src={closeIcon} alt="" /></button>
            </div>
            <form ref={form} className="edit-content">
                <div className="edit-photo">
                    <div className="edit-avatar-block">
                        {
                            avatar
                                ? <img onClick={() => { onChangePhoto(!selectPhotoStatus) }} className="avatar" src={avatar} alt="" />
                                : <img onClick={() => { onChangePhoto(!selectPhotoStatus) }} className="avatar" src={logo} alt="" />
                        }
                        <div className="change-photo-btn"></div>
                    </div>
                    {
                        selectPhotoStatus ?
                        (
                            <div  className="choose-file">
                                <input type="file" onChange={(e) => { imageHandler(e.target.files) }} />
                            </div>
                        )
                        : null
                    }
                    <p className="nickname">{userData.username}</p>
                    <p className={userOnline === "online" ? "online-status-true" : "online-status-false" }>{userOnline}</p>
                </div>
                <div className="edit-info">
                    <div className="change-bio change">
                        <input className="bio-text" value={userBio} onChange={e => setUserBio(e.target.value)}/>
                    </div>
                    <div className="change-name change">
                        <img src={editName} alt="" />
                        <p>Name:</p>
                        <input className="user-name" value={userName} onChange={e => setUserName(e.target.value)}></input>
                    </div>
                    <div className="change-email change">
                        <img src={editEmail} alt="" />
                        <p>Email:</p>
                        <input disabled className="user-email" value={userEmail} onChange={e => setUserEmail(e.target.value)}></input>
                    </div>
                    <div className="change-age change">
                        <img src={changeAge} alt="" />
                        <p>Age:</p>
                        <input className="user-age" value={userAge} onChange={e => setUserAge(e.target.value)}></input>
                    </div>
                </div>
                
            </form>
            <div className="edit-profile-footer">
                <button className="save-changes" onClick={(e) => {sendFile(e)}}>Save</button>
            </div>
        </div>
    )
}
