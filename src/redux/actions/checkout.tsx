import {
	SET_DOCUMENTS,
	SET_PERSONAL_INFO,
	SET_INSURANCE_PERIOD,
	SET_SHIPPING_INFO,
	SET_LOCATION_INFO,
	SET_WITH_SHIPPING,
	SET_SHIPPING_ADDRESS_SAME,
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

export const setWithShipping = () => ({
	type: SET_WITH_SHIPPING,
});

export const setShippingSameAddr = (payload) => ({
	type: SET_SHIPPING_ADDRESS_SAME,
	payload,
});
