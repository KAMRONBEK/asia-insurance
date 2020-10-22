import axios from "axios";
import { url, asiaUrl } from "./config";
import { Platform } from "react-native";

let asiAxios = axios.create({
	headers: { "Content-Type": "application/json" },
});

export let formData = (rawData) => {
	let form = new FormData();
	Object.keys(rawData).forEach((key) => {
		if (Array.isArray(rawData[key])) {
			let obj = rawData[key];
			for (let index in obj) {
				form.append(`${key}[${index}]`, obj[index]);
			}
			return;
		}
		if (typeof rawData[key] === "object") {
			let obj = rawData[key];
			let i = 0;
			Object.keys(obj).forEach((id, index) => {
				if (obj[id]) form.append(`${key}[${i++}]`, parseInt(id));
			});
			return;
		}
		form.append(key, rawData[key]);
	});
	return form;
};

export const constructFileFromUri = (file) => {
	let { path, mime } = file;
	return {
		uri: Platform.OS === "android" ? path : path.replace("file://", ""),
		name: "upload_photo",
		type: mime,
	};
};

export let requests = {
	auth: {
		login: (credentials) =>
			axios.post(`${url}/api/user/sign-in`, formData(credentials)),
		verifyCode: (credentials) =>
			axios.post(`${url}/api/user/send-sms-code`, formData(credentials)),
	},
	authAsia: {
		registerUser: (credentials) =>
			asiAxios.post(`${asiaUrl}/api/Customer/RegisterUser`, credentials),
		userDetails: (credentials) =>
			asiAxios.post(
				`${asiaUrl}/api/Customer/CustomerDetails`,
				credentials
			),
		updateUser: (credentials) =>
			asiAxios.post(
				`${asiaUrl}/api/Customer/UpdateCustomerData`,
				credentials
			),
	},
	order: {
		createOrder: (credentials) =>
			asiAxios.post(`${asiaUrl}/api/Order/CreateOrder2`, credentials),
		orderDetails: (credentials) =>
			asiAxios.post(`${asiaUrl}/api/Order/OrderDetails`, credentials),
		rejectOrder: (credentials) =>
			asiAxios.post(`${asiaUrl}/api/Order/RejectOrder`, credentials),
		getOrders: (credentials) =>
			asiAxios.post(`${asiaUrl}/api/Order/CustomerOrders`, credentials),
	},
	user: {
		profile: (token) =>
			asiAxios.get(`${url}/api/user/profile`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
	},
	news: {
		newsList: () => axios.get(`${url}/api/news`),
		newsIdividual: (id) => axios.get(`${url}/api/news/view?id=${id}`),
	},
	help: {
		requestHelp: (credentails) =>
			axios.post(`${url}/api/driver/send`, formData(credentails)),
		myRequests: () => axios.get(`${url}/api/driver/my-requests`),
		allRequests: () => axios.get(`${url}/api/driver/requests`),
		requestIndividual: (id) =>
			axios.get(`${url}/api/driver/request-view?id=${id}`),
		acceptRequest: (credentials) =>
			axios.post(`${url}/api/driver/accept`, formData(credentials)),
		resendRequest: (credentials) =>
			axios.post(`${url}/api/driver/resend`, formData(credentials)),
	},
	ball: {
		sendBall: (credentials) =>
			axios.post(`${url}/api/driver/send-points`, formData(credentials)),
		getBall: () => axios.get(`${url}/api/driver/points`),
	},
	dictionary: {
		getCountryList: () =>
			axios.get(`${asiaUrl}/api/Dictionaries/CountryList`),
		getRegionList: () =>
			asiAxios.get(`${asiaUrl}/api/Dictionaries/RegionsList`),
		getRayonList: () =>
			asiAxios.get(`${asiaUrl}/api/Dictionaries/RayonsList`),
	},
	policy: {
		checkPolicy: (credentials) =>
			asiAxios.post(`${asiaUrl}/api/Policy/CheckPolicy`, credentials),
		myPolicies: () => asiAxios.get(`${asiaUrl}/api/Policy/MyPolices`),
	},
};
