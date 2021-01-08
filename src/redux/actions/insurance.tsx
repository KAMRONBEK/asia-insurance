import {
	SET_INSURANCE_DATA,
	SET_CURRENT_STEP,
	REMOVE_INSURANCE_DATA,
	SET_INSURANCE_COST,
	SET_ANTI_COVID,
	REFRESH_INCURANCE,
} from "../types";

export const setInsurance = (payload) => ({
	type: SET_INSURANCE_DATA,
	payload,
});

export const setCurrentStep = (payload) => ({
	type: SET_CURRENT_STEP,
	payload,
});

export const setInsuranceCost = (payload) => ({
	type: SET_INSURANCE_COST,
	payload,
});

export const removeInsuranceData = (payload) => ({
	type: REMOVE_INSURANCE_DATA,
	payload,
});

export const setAntiCovid = () => ({
	type: SET_ANTI_COVID,
});

export const refreshInsurance = (payload) => ({
	type: REFRESH_INCURANCE,
	payload,
});
