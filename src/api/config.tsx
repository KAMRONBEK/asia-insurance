import axios from "axios";

export const url = "http://asiainsurance.uz";
export const asiaUrl = "http://81.95.229.2:5000";

export let configureAxios = (store) => {
	axios.interceptors.request.use((res) => {
		let token = store.getState().user.user.token;
		if (token) {
			res.headers.Authorization = `Bearer ${token}`;
		}
		return res;
	});
	// let interceptor = axios.interceptors.response.use(
	// 	res => {
	// 		return Promise.resolve(res);
	// 	},
	// 	error => {
	// 		if (!error || !error.response || error.response.status !== 401) {
	// 			return Promise.reject(error);
	// 		}
	// 		axios.interceptors.response.eject(interceptor);
	// 		return requests.auth
	// 			.refreshToken({
	// 				refreshToken: store.getState().user.refreshToken
	// 			})
	// 			.then(res => {
	// 				error.response.config.headers = {
	// 					Authorization: `Bearer ${res.data.data}`
	// 				};
	// 				store.dispatch(userLoggedIn(res.data));
	// 				return axios(error.response.config);
	// 			})
	// 			.catch(response => {
	// 				return Promise.reject(response);
	// 			})
	// 			.finally(() => configureAxios(store));
	// 	}
	// );
};
