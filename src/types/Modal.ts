export interface ModalState {
    isOpened: boolean;
  }
  
  export enum ModalActionTypes {
    OPEN_CHAT = "OPEN_CHAT",
  }
  
  interface SyncModalAction {
    type: ModalActionTypes.OPEN_CHAT;
    payload: boolean;
  }
  
  export type ModalAction = SyncModalAction;