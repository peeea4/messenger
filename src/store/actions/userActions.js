import axios from "axios";

export function creatingUser(userName) {
	return (dispatch) => {
		axios.post(`https://localhost:44328/users`, {
            "Username": `${userName}`
        })
		.then(res => dispatch(createdUser(res.data)))
	}
}

function createdUser(user) {
	return {
		type: "CREATED_USER",
		payload: user
	}
}


/* ----------------------------- */


export function getingChatsByID(userID) {
	return (dispatch) => {
		axios.get(`https://localhost:44328/users/${userID}/chats`)
		.then(res => dispatch(getChatsByID(res.data)))
	}
}

function getChatsByID(chatList) {
	return {
		type: "GET_USER",
		payload: chatList
	}
}


/* ----------------------------- */


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
