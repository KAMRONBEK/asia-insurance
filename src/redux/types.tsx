export const TOGGLE_MENU = "TOGGLE_MENU";
export const SHOW_FLASH_MESSAGE = "SHOW_FLASH_MESSAGE";

export const SHOW_SELECTION_LOADING = "SHOW_SELECTION_LOADING";
export const HIDE_SELECTION_LOADING = "HIDE_SELECTION_LOADING";

export const SET_INSURANCE_DATA = "SET_INSURANCE_DATA";
export const REMOVE_INSURANCE_DATA = "SET_INSURANCE_DATA";
export const SET_CURRENT_STEP = "SET_CURRENT_STEP";

export type AppState = {
	menuOpen: boolean;
	flashMessage: string;
	flashMessageType: string;
};
