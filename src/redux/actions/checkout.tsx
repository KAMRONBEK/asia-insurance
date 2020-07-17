import {
	SET_DOCUMENTS,
	SET_PERSONAL_INFO,
	SET_INSURANCE_PERIOD,
	SET_SHIPPING_INFO,
	SET_LOCATION_INFO,
} from "../types";

export const setDocuments = (payload) => ({
	type: SET_DOCUMENTS,
	payload,
});

export const setPersonalInfo = (payload) => ({
	type: SET_PERSONAL_INFO,
	payload,
});

export const setInsurancePeriod = (payload) => ({
	type: SET_INSURANCE_PERIOD,
	payload,
});

export const setLocationInfo = (payload) => ({
	type: SET_LOCATION_INFO,
	payload,
});

export const setShippingInfo = (payload) => ({
	type: SET_SHIPPING_INFO,
	payload,
});
