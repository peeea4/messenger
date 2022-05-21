export interface ChatState {
    chatList: any[];
    chatID: string;
    chatIsOpened: boolean;
    currentChat: any;
}

export enum ChatActionTypes {
    CREATE_CHAT = "CREATE_CHAT",
    SET_ID = "SET_ID", 
    GET_USER_CHATS = "GET_USER_CHATS",
    OPEN_CHAT = "OPEN_CHAT",
    GET_CHAT_BY_ID = "GET_CHAT_BY_ID",
    SET_LAST_MESSAGE = "SET_LAST_MESSAGE"
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

interface FetchChatByIdAction {
    type: ChatActionTypes.GET_CHAT_BY_ID;
    payload: {};
}

interface SetChatLastMessageAction {
    type: ChatActionTypes.SET_LAST_MESSAGE;
    payload: {};
}

export type ChatAction = FetchChatAction | FetchChatIDAction | FetchUserChatAction | SyncChatOpenAction | FetchChatByIdAction | SetChatLastMessageAction;