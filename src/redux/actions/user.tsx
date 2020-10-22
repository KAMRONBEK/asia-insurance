import {
	USER_LOGGED_IN,
	USER_LOADED,
	USER_LOGGED_OUT,
	SET_PIN_CODE,
	INIT_USER_STATE,
	CUSTOMER_LOADED,
	SET_DEVICE_TOKEN,
	PROFILE_LOADED,
	PROFILE_STORED,
	PROFILE_LOAD_REDUX,
} from "../types";

export const initUserState = (payload) => ({
	type: INIT_USER_STATE,
	payload,
});

export const userLoggedIn = (payload) => ({
	type: USER_LOGGED_IN,
	payload,
});

export const userLoaded = (payload) => ({
	type: USER_LOADED,
	payload,
});

//new
export const profileStored = (payload) => ({
	type: PROFILE_STORED,
	payload,
});

export const profileLoadRedux = (payload) => ({
	type: PROFILE_LOAD_REDUX,
	payload,
});

export const customerLoaded = (payload) => ({
	type: CUSTOMER_LOADED,
	payload,
});

export const userLoggedOud = () => ({
	type: USER_LOGGED_OUT,
});

export const setPinCode = (payload) => ({
	type: SET_PIN_CODE,
	payload,
});

export const setDeviceToken = (payload) => ({
	type: SET_DEVICE_TOKEN,
	payload,
});
