import axios from "axios";
import { Dispatch } from "react";
import { ModalAction, ModalActionTypes } from "../../types/Modal";
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
	return async (dispatch: Dispatch<UserAction | ModalAction>) => {
        try {
            const response = await axios.post(`https://localhost:44328/auth/signIn`, {
                "Email": userEmail,
                "Password": userPass
            });
            localStorage.setItem("user", JSON.stringify(response.data));
            dispatch({type: UserActionTypes.CREATE_USER, payload: response.data});
        } catch (error: any) {
            console.log("ошибка", error);
            dispatch({type: ModalActionTypes.CHANGE_MODAL_STATUS, payload: {status: true, text: error.response.data}})
        }
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
        const res = await axios.put(`https://localhost:44328/users/${userId}`, userData);
        const userToken = JSON.parse(localStorage.getItem("user") || "").accessToken
        localStorage.setItem("user", JSON.stringify({user: {...res.data}, accessToken: userToken}));
        getUserById(userId);
        dispatch({type: UserActionTypes.UPDATE_USER});
        const response = await axios.get(`https://localhost:44328/users`);
        dispatch({type: UserActionTypes.CREATE_USER_LIST, payload: response.data});
	};
};

export function setUserOnline(userOnline: string | boolean) {
	return async (dispatch: Dispatch<UserAction>) => {        
        dispatch({type: UserActionTypes.SET_USER_ONLINE, payload: userOnline});
	};
};

// export function updateUserName(userId: any, userData: any, userName: string) {
// 	return async (dispatch: Dispatch<UserAction | ModalAction>) => {
//         const response = await axios.post(`https://localhost:44328/users/${userId}`, {
//             ...userData,
//             userName
//         });
//         console.log(response);
        
//         // dispatch({type: UserActionTypes.CREATE_USER, payload: response.data});
// 	};
// }
