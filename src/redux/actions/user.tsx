import {
	USER_LOGGED_IN,
	USER_LOADED,
	USER_LOGGED_OUT,
	SET_PIN_CODE,
	INIT_USER_STATE,
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

export const userLoggedOud = () => ({
	type: USER_LOGGED_OUT,
});

export const setPinCode = (payload) => ({
	type: SET_PIN_CODE,
	payload,
});
