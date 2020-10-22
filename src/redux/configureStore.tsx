import { combineReducers, createStore } from "redux";
import appState from "./reducers/appState";
import insurance from "./reducers/insurance";
import checkout from "./reducers/checkout";
import user from "./reducers/user";
import mapState from "./reducers/mapState";
import sos from "./reducers/sos";

import Reactotron from "./ReactotronConfig";

let configureStore = () => {
	const store = createStore(
		combineReducers({ appState, insurance, checkout, user, mapState, sos }),
		Reactotron.createEnhancer()
	);
	return store;
};

export default configureStore;
