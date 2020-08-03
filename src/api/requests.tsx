import axios from "axios";
import { url } from "./config";

let formData = (rawData) => {
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

export let requests = {
	auth: {
		login: (credentials) =>
			axios.post(`${url}/api/user/sign-in`, formData(credentials)),
		verifyCode: (credentials) =>
			axios.post(`${url}/api/user/send-sms-code`, formData(credentials)),
	},
	user: {
		profile: (token) =>
			axios.get(`${url}/api/user/profile`, {
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
		myRequests: (status) =>
			axios.get(`${url}/api/driver/requests?status=${status}`),
		requestIndividual: (id) =>
			axios.get(`${url}/api/driver/request-view?id=${id}`),
		acceptRequest: (credentials) =>
			axios.post(`${url}/api/driver/accept`, formData(credentials)),
	},
};
