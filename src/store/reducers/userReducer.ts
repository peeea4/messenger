import { UserState, UserAction, UserActionTypes } from "../../types/User"

const initialState: UserState = {
    currentUser: {
        user: {}, 
        accessToken: ""
    },
    currentUserData: {},
    userList: []
};

export const userReducer = (state = initialState, action: UserAction): UserState => {
	switch (action.type) {
		case UserActionTypes.CREATE_USER:
			return {
                ...state,
                currentUser: action.payload 
            }
        case UserActionTypes.CREATE_USER_DATA:
            return {
                ...state,
                currentUserData: action.payload 
            }
        case UserActionTypes.CREATE_USER_LIST:
            return {
                ...state,
                userList: action.payload
            }
        case UserActionTypes.UPDATE_USER:
            return {
                ...state,
            }
		default: return state
	}
}
