import {
	SET_DOCUMENTS,
	SET_PERSONAL_INFO,
	SET_INSURANCE_PERIOD,
	SET_LOCATION_INFO,
	SET_SHIPPING_INFO,
	SET_WITH_SHIPPING,
	SET_SHIPPING_ADDRESS_SAME,
} from "../types";

const initialState = {
	documents: [],
	personalInfo: {},
	insurancePeriod: {},
	locationInfo: {},
	shipping: {
		withShipping: false,
		sameAddress: false,
	},
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_DOCUMENTS:
			return {
				...state,
				documents: [...state.documents, ...payload],
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
		case SET_WITH_SHIPPING: {
			console.log("withshipping", state.shipping.withShipping);
			return {
				...state,
				shipping: {
					...state.shipping,
					withShipping: !state.shipping.withShipping,
				},
			};
		}
		case SET_SHIPPING_ADDRESS_SAME: {
			return {
				...state,
				shipping: {
					...state.shipping,
					sameAddress: payload,
					shipping: payload ? true : state.shipping.withShipping,
				},
			};
		}

		default:
			return state;
	}
};
