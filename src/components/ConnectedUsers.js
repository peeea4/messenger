export const ConnectedUsers = ({ users }) => {
    console.log(users);
    return (
        <div className="user-list">
            <h4>Участники</h4>
            {
                users.map((user, index) => (<h6 key={index} className={user === localStorage.userName ? "user-owner" : "user-frined"}>{user}</h6>))
            }
        </div>
    )
}
