import {
	SET_DOCUMENTS,
	SET_PERSONAL_INFO,
	SET_INSURANCE_PERIOD,
	SET_LOCATION_INFO,
	SET_SHIPPING_INFO,
} from "../types";

const initialState = {
	documents: [],
	personalInfo: {},
	insurancePeriod: {},
	locationInfo: {},
	shipping: {},
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_DOCUMENTS:
			return {
				...state,
				documents: payload,
			};
		case SET_PERSONAL_INFO:
			return {
				...state,
				personalInfo: payload,
			};
		case SET_INSURANCE_PERIOD:
			return {
				...state,
				insurancePeriod: payload,
			};
		case SET_LOCATION_INFO:
			return {
				...state,
				locationInfo: payload,
			};
		case SET_SHIPPING_INFO:
			return {
				...state,
				shipping: payload,
			};

		default:
			return state;
	}
};
