import { combineReducers, createStore } from "redux";
import appState from "./reducers/appState";
import insurance from "./reducers/insurance";
import checkout from "./reducers/checkout";

let configureStore = () => {
	return createStore(combineReducers({ appState, insurance, checkout }));
};

export default configureStore;
