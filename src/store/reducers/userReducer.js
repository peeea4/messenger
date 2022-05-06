import { CREATED_USER, CREATE_USER_LIST } from "../constants"

const initialStore = {
    userList: [],
}
export const userReducer = (state = initialStore, action) => {
	switch (action.type) {
		case CREATED_USER:
			return {
                ...state,
                user: {...action.payload}
            }
        case CREATE_USER_LIST:
            return {
                ...state,
                userList: [...action.payload]
            }
		default: return state
	}
}
