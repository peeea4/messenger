import axios from "axios";
import { CREATED_USER } from "../constants";

export function registrationUserAsync(userEmail, userName, userPass) {
	return (dispatch) => {
		axios.post(`https://localhost:44328/users`, {
            "Username": userName,
            "Email": userEmail,
            "Password": userPass
        })
		.then(res => {
            dispatch(creatingUser(res.data.user));
        })
	}
}

export function authorizationUserAsync(userEmail, userPass) {
	return (dispatch) => {
		axios.post(`https://localhost:44328/auth/signIn`, {
            "Email": userEmail,
            "Password": userPass
        })
		.then(res => {
            console.log(res.data.user);
            dispatch(creatingUser(res.data.user));
        })
	}
}

function creatingUser(user) {
	return {
		type: CREATED_USER,
		payload: user
	}
}

/* --- */

export function getUserListAsync() {
	return (dispatch) => {
		axios.get(`https://localhost:44328/users`)
		.then(res => {
            dispatch(createUserList(res.data));
        })
	}
}

function createUserList(userList) {
	return {
		type: "CREATE_USER_LIST",
		payload: userList
	}
}

/* --- */

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
