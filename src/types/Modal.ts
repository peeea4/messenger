export interface ModalState {
    searchIsOpened: boolean;
    profileIsOpened: boolean;
    chatInfoIsOpened: boolean;
    navBarIsOpened: boolean;
    modalResponseOpened: boolean;
}
  
export enum ModalActionTypes {
    CHANGE_SEARCH_STATUS = "CHANGE_SEARCH_STATUS",
    CHANGE_PROFILE_STATUS = "CHANGE_PROFILE_STATUS",
    CHANGE_CHAT_INFO_STATUS = "CHANGE_CHAT_INFO_STATUS",
    CHANGE_NAVBAR_STATUS = "CHANGE_NAVBAR_STATUS",
    CHANGE_MODAL_STATUS = "CHANGE_MODAL_STATUS"
}

interface ModalSearchAction {
    type: ModalActionTypes.CHANGE_SEARCH_STATUS;
    payload: boolean;
}

interface ModalProfileAction {
    type: ModalActionTypes.CHANGE_PROFILE_STATUS;
    payload: boolean;
}

interface ModalChatInfoAction {
    type: ModalActionTypes.CHANGE_CHAT_INFO_STATUS;
    payload: boolean;
}
  
interface ModalNavBarAction {
    type: ModalActionTypes.CHANGE_NAVBAR_STATUS;
    payload: boolean;
}

interface ModalResponseAction {
    type: ModalActionTypes.CHANGE_MODAL_STATUS;
    payload: boolean;
}

export type ModalAction = ModalSearchAction | ModalProfileAction | ModalChatInfoAction | ModalNavBarAction | ModalResponseAction;