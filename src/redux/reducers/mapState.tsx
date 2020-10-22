import { SET_MY_LOCATION, SET_HELP_LOCATION } from "../types";

const INITIAL_STATE = {
	userLocation: {},
	helpLocation: {},
};

export default (state = INITIAL_STATE, { type, payload }) => {
	switch (type) {
		case SET_MY_LOCATION:
			return {
				...state,
				userLocation: payload,
			};
		case SET_HELP_LOCATION:
			return {
				...state,
				helpLocation: payload,
			};
		default:
			return state;
	}
};
