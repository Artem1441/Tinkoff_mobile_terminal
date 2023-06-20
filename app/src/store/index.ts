import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import DataReducer from "./DataReducer";
import TokenReducer from "./TokenReducer";

const rootReducer = combineReducers({
    TokenReducerName: TokenReducer,
    DataReducerName: DataReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;