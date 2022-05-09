export interface UserState {
    currentUser: any;
    userList: any[];
}

export enum UserActionTypes {
    CREATE_USER = "CREATE_USER",
    CREATE_USER_LIST = "CREATE_USER_LIST"
}

interface FetchUserAction {
    type: UserActionTypes.CREATE_USER;
    payload: {};
}

interface FetchUserListAction {
    type: UserActionTypes.CREATE_USER_LIST;
    payload: any[];
}

export type UserAction = FetchUserAction | FetchUserListAction;
