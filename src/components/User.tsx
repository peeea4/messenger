import React from "react";
const logo = require("../assets/icons/user.png");
type UserProps = {
    user: any;
}

export const User:React.FC<UserProps> = ({user}) => {
    let avatar = user?.profileImageFilePath ? user?.profileImageFilePath : logo;
    return (
        <div className="user">
            <div className="user-photo"><img src={avatar} alt="" /></div>
            <div className="user-info">{user.username}</div>
        </div>
    )
}
