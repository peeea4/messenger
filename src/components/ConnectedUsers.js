export const ConnectedUsers = ({ users }) => {
    return (
        <div className="user-list">
            <h4>Connected Users</h4>
            {
                users.map((user, index) => (<h6 key={index} className={user === localStorage.userName ? "user-owner" : "user-frined"}>{user}</h6>))
            }
        </div>
    )
}
