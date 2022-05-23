import axios from "axios";
import { Dispatch } from "react";
import { UserAction, UserActionTypes } from "../../types/User";

export const registrationUserAsync = (userEmail: string, userName: string, userPass: string) => {
	return async (dispatch:Dispatch<UserAction>) => {
		const response = await axios.post(`https://localhost:44328/auth/register`, {
            "Username": userName,
            "Email": userEmail,
            "Password": userPass
        });
        localStorage.setItem("user", JSON.stringify(response.data));
        dispatch({type: UserActionTypes.CREATE_USER, payload: response.data});
	};
};

export function authorizationUserAsync(userEmail:string, userPass:string) {
	return async (dispatch: Dispatch<UserAction>) => {
		const response = await axios.post(`https://localhost:44328/auth/signIn`, {
            "Email": userEmail,
            "Password": userPass
        });
        localStorage.setItem("user", JSON.stringify(response.data));
        dispatch({type: UserActionTypes.CREATE_USER, payload: response.data});
	};
};

export function getUserListAsync() {
	return async (dispatch: Dispatch<UserAction>) => {
		const response = await axios.get(`https://localhost:44328/users`);
        dispatch({type: UserActionTypes.CREATE_USER_LIST, payload: response.data});
	};
};

export function getUserById(userID: any) {
	return async (dispatch: Dispatch<UserAction>) => {        
		const response = await axios.get(`https://localhost:44328/users/${userID}`);
        dispatch({type: UserActionTypes.CREATE_USER_DATA, payload: response.data});
	};
};

export function createUser() {
	return async (dispatch: Dispatch<UserAction>) => {        
        const userData = JSON.parse(localStorage.getItem("user") || "")
        dispatch({type: UserActionTypes.CREATE_USER, payload: userData});
	};
};

export function updateUser(userId:any, userData:any) {
	return async (dispatch: Dispatch<UserAction>) => {        
        const response = await axios.put(`https://localhost:44328/users/${userId}`, userData);
        getUserById(userId);
        dispatch({type: UserActionTypes.UPDATE_USER});
	};
};
