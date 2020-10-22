import { SET_MY_LOCATION, SET_HELP_LOCATION, SOS_LIST_UPDATE } from "../types";

const INITIAL_STATE = {
	counter: 0,
};

export default (state = INITIAL_STATE, { type, payload }) => {
	switch (type) {
		case SOS_LIST_UPDATE:
			return {
				...state,
				counter: state.counter + 1,
			};
		default:
			return state;
	}
};
