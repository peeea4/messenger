export interface ModalState {
    searchIsOpened: boolean;
    profileIsOpened: boolean;
}
  
export enum ModalActionTypes {
    CHANGE_SEARCH_STATUS = "CHANGE_SEARCH_STATUS",
    CHANGE_PROFILE_STATUS = "CHANGE_PROFILE_STATUS"
}

interface ModalSearchAction {
    type: ModalActionTypes.CHANGE_SEARCH_STATUS;
    payload: boolean;
}

interface ModalProfileAction {
    type: ModalActionTypes.CHANGE_PROFILE_STATUS;
    payload: boolean;
}
  
export type ModalAction = ModalSearchAction | ModalProfileAction;