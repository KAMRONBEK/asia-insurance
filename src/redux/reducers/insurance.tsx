import {
	SET_INSURANCE_DATA,
	SET_CURRENT_STEP,
	REMOVE_INSURANCE_DATA,
	SET_INSURANCE_COST,
	SET_ANTI_COVID,
	REFRESH_INCURANCE,
} from "../types";

const INITIAL_STATE = {
	osago: {
		car: {
			//test
			// carType: {},
			// carRegisterPlace: {},
		},
		insuranceCases: {
			//test
			// availableInsurance: {},
			// insuranceSeries: {},
			// haveViolation: {},
		},
		privilege: {
			//test
			// availablePrivilege: {},
			// residence: {},
			// individualStatus: {},
		},
		insurancePeriod: {},
		driver: {},
	},
	vzr: {
		destinationCountry: {},
		tripDuration: {},
		tripPurpose: {},
		insuredPerson: {},
		antiCovid: false,
	},
	currentStep: 1,
	cost: 0,
};

export default (state = INITIAL_STATE, { type, payload }) => {
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
		case SET_INSURANCE_COST:
			return {
				...state,
				cost: payload,
			};
		case SET_ANTI_COVID:
			return {
				...state,
				vzr: { ...state.vzr, antiCovid: !state.vzr.antiCovid },
			};

		case REFRESH_INCURANCE:
			if (payload == "osago") {
				console.log("osago");

				return {
					...state,
					osago: {
						car: {},
						insuranceCases: {},
						privilege: {},
						insurancePeriod: {},
						driver: {},
					},
				};
			} else {
				console.log("vzr");

				return {
					...state,
					vzr: {
						destinationCountry: {},
						tripDuration: {},
						tripPurpose: {},
						insuredPerson: {},
						antiCovid: false,
					},
				};
			}
		default:
			return state;
	}
};
