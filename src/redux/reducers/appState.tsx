import {
	TOGGLE_MENU,
	SHOW_FLASH_MESSAGE,
	SHOW_SELECTION_LOADING,
	HIDE_SELECTION_LOADING,
} from "../types";

const initialState = {
	menuOpen: false,
	flashMessage: "",
	flashMessageType: "",
	selectionLoading: false,
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case TOGGLE_MENU:
			return { ...state, menuOpen: !state.menuOpen };
		case SHOW_FLASH_MESSAGE:
			return {
				...state,
				flashMessage: payload.message,
				flashMessageType: payload.type,
			};
		case SHOW_SELECTION_LOADING:
			return {
				...state,
				selectionLoading: true,
			};
		case HIDE_SELECTION_LOADING:
			return {
				...state,
				selectionLoading: false,
			};
		default:
			return state;
	}
};
