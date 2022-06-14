export interface ModalState {
    searchIsOpened: boolean;
    profileIsOpened: boolean;
    contactIsOpened: boolean;
    chatInfoIsOpened: boolean;
    navBarIsOpened: boolean;
    modalResponseOpened: {
        status: boolean,
        text: string,
    };
}
  
export enum ModalActionTypes {
    CHANGE_SEARCH_STATUS = "CHANGE_SEARCH_STATUS",
    CHANGE_PROFILE_STATUS = "CHANGE_PROFILE_STATUS",
    CHANGE_CHAT_INFO_STATUS = "CHANGE_CHAT_INFO_STATUS",
    CHANGE_NAVBAR_STATUS = "CHANGE_NAVBAR_STATUS",
    CHANGE_MODAL_STATUS = "CHANGE_MODAL_STATUS",
    CHANGE_CONTATS_STATUS = "CHANGE_CONTATS_STATUS",
}

interface ModalSearchAction {
    type: ModalActionTypes.CHANGE_SEARCH_STATUS;
    payload: boolean;
}

interface ModalProfileAction {
    type: ModalActionTypes.CHANGE_PROFILE_STATUS;
    payload: boolean;
}

interface ModalContactAction {
    type: ModalActionTypes.CHANGE_CONTATS_STATUS;
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
    payload: any;
}

export type ModalAction = ModalSearchAction | ModalProfileAction | ModalContactAction | ModalChatInfoAction | ModalNavBarAction | ModalResponseAction;