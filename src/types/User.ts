export interface UserState {
    currentUser: any;
    currentUserData: any;
    userList: any[];
    userOnline: string | boolean;
}

export enum UserActionTypes {
    CREATE_USER = "CREATE_USER",
    CREATE_USER_LIST = "CREATE_USER_LIST", 
    UPDATE_USER = "UPDATE_USER", 
    CREATE_USER_DATA = "CREATE_USER_DATA",
    SET_USER_ONLINE = "SET_USER_ONLINE",
    UPDATE_USER_NAME = "UPDATE_USER_NAME"
}

interface FetchUseCreateAction {
    type: UserActionTypes.CREATE_USER;
    payload: {};
}

interface FetchUserListAction {
    type: UserActionTypes.CREATE_USER_LIST;
    payload: any[];
}

interface FetchUserUpdateAction {
    type: UserActionTypes.UPDATE_USER;
}

interface FetchCreateUserDataAction {
    type: UserActionTypes.CREATE_USER_DATA;
    payload: {};
}

interface SetUserOnlineAction {
    type: UserActionTypes.SET_USER_ONLINE;
    payload: any;
}

interface FetchUserUpdateNameAction {
    type: UserActionTypes.UPDATE_USER_NAME;
    payload: any;
}

export type UserAction = FetchUseCreateAction | FetchUserListAction | FetchUserUpdateAction | FetchCreateUserDataAction | SetUserOnlineAction | FetchUserUpdateNameAction;
