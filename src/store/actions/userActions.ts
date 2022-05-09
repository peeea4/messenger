import axios from "axios";
import { Dispatch } from "react";
import { UserAction, UserActionTypes } from "../../types/User";

export const registrationUserAsync = (userEmail: string, userName: string, userPass: string) => {
	return async (dispatch:Dispatch<UserAction>) => {
		const response = await axios.post(`https://localhost:44328/users`, {
            "Username": userName,
            "Email": userEmail,
            "Password": userPass
        });
        dispatch({type: UserActionTypes.CREATE_USER, payload: response.data});
	}
}

export function authorizationUserAsync(userEmail:string, userPass:string) {
	return async (dispatch: Dispatch<UserAction>) => {
		const response = await axios.post(`https://localhost:44328/auth/signIn`, {
            "Email": userEmail,
            "Password": userPass
        });
        dispatch({type: UserActionTypes.CREATE_USER, payload: response.data});
	}
}

export function getUserListAsync() {
	return async (dispatch: Dispatch<UserAction>) => {
		const response = await axios.get(`https://localhost:44328/users`);
        dispatch({type: UserActionTypes.CREATE_USER_LIST, payload: response.data});
	}
    
}
