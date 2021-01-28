import {
	USER_LOADED,
	USER_LOGGED_IN,
	SET_PIN_CODE,
	INIT_USER_STATE,
	CUSTOMER_LOADED,
	SET_DEVICE_TOKEN,
	PROFILE_LOADED,
	PROFILE_STORED,
	PROFILE_LOAD_REDUX,
} from "../types";
import AsyncStorage from "@react-native-community/async-storage";
import PlainText from "../../components/common/PlainText";
import reactotron from "../ReactotronConfig";

let initialState = {
	settings: {},
	//* Backend has user field
	user: {
		device_token: "",
	},
	pinCode: "",
	customerId: "",
	profile: {},
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case INIT_USER_STATE:
			return payload;
		case PROFILE_STORED:
			let newProfile = payload;
			AsyncStorage.setItem("@profile", JSON.stringify(newProfile));
			return { ...state, profile: newProfile };
		case PROFILE_LOAD_REDUX:
			return { ...state, profile: payload };
		case USER_LOADED:
			return { ...state, user: payload };
		case CUSTOMER_LOADED:
			return { ...state, customerId: payload };
		case SET_DEVICE_TOKEN:
			return { ...state, user: { ...state.user, device_token: payload } };
		case USER_LOGGED_IN:
			let newState = {
				...state,
				user: payload.user,
				customerId: payload.id,
			};
			AsyncStorage.setItem("@user", JSON.stringify(newState));
			return newState;
		case SET_PIN_CODE:
			let newStatePin = { ...state, pinCode: payload };
			AsyncStorage.setItem("@user", JSON.stringify(newStatePin));
			return newStatePin;
		default:
			return state;
	}
};
