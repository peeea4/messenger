export interface ChatState {
    chatList: any[];
    chatID: string;
}

export enum ChatActionTypes {
    CREATE_CHAT = "CREATE_CHAT",
    SET_ID = "SET_ID"
}

interface FetchChatAction {
    type: ChatActionTypes.CREATE_CHAT;
    payload: {};
}

interface FetchChatIDAction{
    type: ChatActionTypes.SET_ID;
    payload: string;
}

export type ChatAction = FetchChatAction | FetchChatIDAction