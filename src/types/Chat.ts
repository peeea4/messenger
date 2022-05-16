export interface ChatState {
    chatList: any[];
    chatID: string;
    chatIsOpened: boolean;
}

export enum ChatActionTypes {
    CREATE_CHAT = "CREATE_CHAT",
    SET_ID = "SET_ID", 
    GET_USER_CHATS = "GET_USER_CHATS",
    OPEN_CHAT = "OPEN_CHAT",
}

interface FetchChatAction {
    type: ChatActionTypes.CREATE_CHAT;
}

interface SyncChatOpenAction {
    type: ChatActionTypes.OPEN_CHAT;
    payload: boolean;
}

interface FetchChatIDAction{
    type: ChatActionTypes.SET_ID;
    payload: string;
}

interface FetchUserChatAction {
    type: ChatActionTypes.GET_USER_CHATS;
    payload: [];
}

export type ChatAction = FetchChatAction | FetchChatIDAction | FetchUserChatAction | SyncChatOpenAction;