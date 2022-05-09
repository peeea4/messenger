export interface MessageState {
    messages: any[];
}

export enum MessageActionTypes {
    SET_MESSAGE = "SET_MESSAGE",
}

interface SyncMessageAction {
    type: MessageActionTypes.SET_MESSAGE;
    payload: any[];
}

export type MessageAction = SyncMessageAction;