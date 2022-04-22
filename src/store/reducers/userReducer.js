import { ADD_CHAT} from "../actions/usersActions"
const initialStore = {
	chatList: []
}
expot const userReducer = (state = initialStore, action) => {
	switch (action.type) { 
		case ADD_CHAT:
			return {
				...state,
				
			}
	}
}