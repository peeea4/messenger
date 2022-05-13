import * as ChatActionCreators from "./chatActions"
import * as UserActionCreators from "./userActions"
import * as MessageActionCreators from "./messageActions"
import * as ModalActionCreators from "./modalActions"

export const ActionCreators = {
    ...ChatActionCreators, 
    ...MessageActionCreators, 
    ...UserActionCreators,
    ...ModalActionCreators,
}