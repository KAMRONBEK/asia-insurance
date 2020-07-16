import {
	TOGGLE_MENU,
	SHOW_FLASH_MESSAGE,
	SHOW_SELECTION_LOADING,
	HIDE_SELECTION_LOADING,
} from "../types";

export const toggleMenu = () => ({
	type: TOGGLE_MENU,
});

export const showFlashMessage = (payload) => ({
	type: SHOW_FLASH_MESSAGE,
	payload,
});

export const showSelectionLoading = () => ({
	type: SHOW_SELECTION_LOADING,
});

export const hideSelectionLoading = () => ({
	type: HIDE_SELECTION_LOADING,
});
