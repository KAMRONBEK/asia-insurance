import {
	SET_INSURANCE_DATA,
	SET_CURRENT_STEP,
	REMOVE_INSURANCE_DATA,
} from "../types";

const initialState = {
	osago: {
		car: {},
		insuranceCases: {},
		privilege: {},
		insurancePeriod: {},
		driver: {},
	},
	vzr: {
		destinationCountry: {},
		tripDuration: {},
		tripPurpose: {},
		insuredPerson: {},
	},
	currentStep: 1,
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_INSURANCE_DATA:
			return {
				...state,
				[payload.parent]: {
					...state[payload.parent],
					[payload.child]: payload.data,
				},
			};

		case REMOVE_INSURANCE_DATA:
			return {
				...state,
				[payload.parent]: {
					...state[payload.parent],
					[payload.child]: {},
				},
			};

		case SET_CURRENT_STEP:
			return {
				...state,
				currentStep: payload,
			};

		default:
			return state;
	}
};
