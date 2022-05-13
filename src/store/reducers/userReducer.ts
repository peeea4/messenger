import { UserState, UserAction, UserActionTypes } from "../../types/User"

const initialState: UserState = {
    currentUser: {
        user: {}, 
        accessToken: ""
    },
    userList: [],
};

export const userReducer = (state = initialState, action: UserAction): UserState => {
	switch (action.type) {
		case UserActionTypes.CREATE_USER:
			return {
                ...state,
                currentUser: action.payload 
            }
        case UserActionTypes.CREATE_USER_LIST:
            return {
                ...state,
                userList: action.payload
            }
		default: return state
	}
}
