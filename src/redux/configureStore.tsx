import { combineReducers, createStore } from "redux";
import appState from "./reducers/appState";
import insurance from "./reducers/insurance";
import checkout from "./reducers/checkout";
import user from "./reducers/user";

let configureStore = () => {
	return createStore(
		combineReducers({ appState, insurance, checkout, user })
	);
};

export default configureStore;
