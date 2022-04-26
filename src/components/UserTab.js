export const UserTab = ({username}) => {
	return (
		<div className="user-tab" >
			<h4 className="user-name">{username}</h4>
			<p className="user-last-message"></p>
		</div>
	);
}
