import { IAction } from "./IAction"

const SET_TOKEN = "SET_TOKEN"
const SET_ACCOUNT_ID = "SET_ACCOUNT_ID"
const SET_ERROR = "SET_ERROR"

const defaultState = {
    token: "",
    accountId: "",
    error: ""
};

const TokenReducer = (state = defaultState, action: IAction) => {
    switch (action.type) {
        case SET_TOKEN: {
            return {
                ...state,
                token: action.payload,
            };
        }
        case SET_ACCOUNT_ID: {
            return {
                ...state,
                accountId: action.payload,
            };
        }
        case SET_ERROR: {
            return {
                ...state,
                error: action.payload,
            };
        }
        default:
            return state;
    }
}

export default TokenReducer;


export const setTokenAction = (str: string) => ({
    type: SET_TOKEN,
    payload: str,
});

export const setAccountIdAction = (str: string) => ({
    type: SET_ACCOUNT_ID,
    payload: str,
});

export const setErrorAction = (str: string) => ({
    type: SET_ERROR,
    payload: str,
});