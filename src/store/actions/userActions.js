import axios from "axios";

export function registrationUserAsync(userEmail, userName, userPass) {
	return (dispatch) => {
		axios.post(`https://localhost:44328/users`, {
            "Username": userName,
            "Email": userEmail,
            "Password": userPass
        })
		.then(res => {
            dispatch(creatingUser(res.data));
        })
	}
}

export function authorizationUserAsync(userEmail, userName, userPass) {
	return (dispatch) => {
		axios.post(`https://localhost:44328/users`, {
            "Username": userName,
            "Email": userEmail,
            "Password": userPass
        })
		.then(res => {
            dispatch(creatingUser(res.data));
        })
	}
}

function creatingUser(user) {
	return {
		type: "CREATED_USER",
		payload: user
	}
}



// export function getingUserByID(userID) {
// 	return (dispatch) => {
// 		axios.get(`https://localhost:44328/users/${userID}`)
// 		.then(res => dispatch(getUser(res.data)))
// 	}
// }

// function getUser(newUser) {
// 	return {
// 		type: "GET_USER",
// 		payload: newUser
// 	}
// }
