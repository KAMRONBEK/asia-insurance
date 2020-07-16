import { combineReducers, createStore } from "redux";
import appState from "./reducers/appState";
import insurance from "./reducers/insurance";

let configureStore = () => {
	return createStore(combineReducers({ appState, insurance }));
};

export default configureStore;
