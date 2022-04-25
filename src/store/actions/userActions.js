import axios from "axios";

export function fetchingUser(userID) {
	return (dispatch) => {
		axios.get(`http://localhost:3000/users/${userID}`)
			.then(res => dispatch(fetchedUser(res.data)))
	}
}

function fetchedUser(user) {
	return {
		type: "FETCHED_USER",
		payload: user
	}
}