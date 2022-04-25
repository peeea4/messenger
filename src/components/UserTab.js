export const UserTab = (username, room, id, joinRoom) => {
	return (
		<div className="user-tab" onClick={() => {joinRoom(username, room)}}>
			<h4 className="user-name">${username}</h4>
			<p className="user-last-message"></p>
		</div>
	);
}
