import * as ChatActionCreators from "./chatActions"
import * as UserActionCreators from "./userActions"
import * as MessageActionCreators from "./messageActions"

export default {
    ...ChatActionCreators, 
    ...MessageActionCreators, 
    ...UserActionCreators
}