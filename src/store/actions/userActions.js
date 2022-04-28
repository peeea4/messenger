import axios from "axios";

export function creatingUser(userEmail, userName, userPass) {
	return (dispatch) => {
		axios.post(`https://localhost:44328/users`, {
            "Username": userName,
            "Email": userEmail,
            "Password": userPass
        })
		.then(res => {
            dispatch(createdUser(res.data));
        })
	}
}

function createdUser(user) {
	return {
		type: "CREATED_USER",
		payload: user
	}
}



export function getingUserByID(userID) {
	return (dispatch) => {
		axios.get(`https://localhost:44328/users/${userID}`)
		.then(res => dispatch(getUser(res.data)))
	}
}

function getUser(newUser) {
	return {
		type: "GET_USER",
		payload: newUser
	}
}
