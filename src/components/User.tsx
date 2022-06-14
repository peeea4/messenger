import React from "react";

type UserProps = {
    user: any;
}

export const User:React.FC<UserProps> = ({user}) => {
    return (
        <div className="user">
            <div className="user-photo"><img src="" alt="" /></div>
            <div className="user-info">{user.username}</div>
        </div>
    )
}
