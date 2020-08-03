import {
	USER_LOADED,
	USER_LOGGED_IN,
	SET_PIN_CODE,
	INIT_USER_STATE,
} from "../types";
import AsyncStorage from "@react-native-community/async-storage";

const initialState = {
	settings: {},
	//* Backend has user field
	user: {},
	pinCode: "",
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case INIT_USER_STATE:
			return payload;
		case USER_LOADED:
			return { ...state, user: payload };
		case USER_LOGGED_IN:
			let newState = { ...state, user: payload };
			AsyncStorage.setItem("@credentials", JSON.stringify(newState));
			return newState;
		case SET_PIN_CODE:
			let newStatePin = { ...state, pinCode: payload };
			AsyncStorage.setItem("@credentials", JSON.stringify(newStatePin));
			return newStatePin;
		default:
			return state;
	}
};
