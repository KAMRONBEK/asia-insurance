import { SET_MY_LOCATION, SET_HELP_LOCATION } from "../types";

export const setMyLocation = (payload) => ({
	type: SET_MY_LOCATION,
	payload,
});

export const setHelpLocation = (payload) => ({
	type: SET_HELP_LOCATION,
	payload,
});
