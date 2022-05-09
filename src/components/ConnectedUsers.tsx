type ConnectedUsersProps = {
    users: any[]
}
export const ConnectedUsers:React.FC<ConnectedUsersProps> = ({ users }) => {
    return (
        <div className="user-list">
            <h4>Участники</h4>
            {
                users.map((user: any, index: number) => (<h6 key={index} className={user === localStorage.userName ? "user-owner" : "user-frined"}>{user}</h6>))
            }
        </div>
    )
}
