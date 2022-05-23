export interface UserState {
    currentUser: any;
    currentUserData: any;
    userList: any[];
}

export enum UserActionTypes {
    CREATE_USER = "CREATE_USER",
    CREATE_USER_LIST = "CREATE_USER_LIST", 
    UPDATE_USER = "UPDATE_USER", 
    CREATE_USER_DATA = "CREATE_USER_DATA"
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

export type UserAction = FetchUseCreateAction | FetchUserListAction | FetchUserUpdateAction | FetchCreateUserDataAction;
