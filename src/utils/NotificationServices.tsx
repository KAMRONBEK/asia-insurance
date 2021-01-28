import PushNotification from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { initUserState, setDeviceToken } from "../redux/actions";
import AsyncStorage from "@react-native-community/async-storage";

export let init = (store) => {
	// Must be outside of any component LifeCycle (such as `componentDidMount`).
	PushNotification.configure({
		// (optional) Called when Token is generated (iOS and Android)
		onRegister: async function (token) {
			let storage = await AsyncStorage.getItem("@user");
			if (storage) {
				let parsedStore = JSON.parse(storage);
				parsedStore.user.device_token = token.token;
				store.dispatch(initUserState(parsedStore));
			}
			console.log("TOKEN:", token);
			// store.dispatch(setDeviceToken(token.token));
		},

		// (required) Called when a remote is received or opened, or local notification is opened
		onNotification: function (notification) {
			console.log("NOTIFICATION:", notification);

			// process the notification

			// (required) Called when a remote is received or opened, or local notification is opened
			// notification.finish(PushNotificationIOS.FetchResult.NoData);
		},

		// (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
		onAction: function (notification) {
			console.log("ACTION:", notification.action);
			console.log("NOTIFICATION:", notification);

			// process the action
		},

		// (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
		onRegistrationError: function (err) {
			console.error(err.message, err);
		},

		// IOS ONLY (optional): default: all - Permissions to register.
		permissions: {
			alert: true,
			badge: true,
			sound: true,
		},

		// Should the initial notification be popped automatically
		// default: true
		popInitialNotification: true,

		/**
		 * (optional) default: true
		 * - Specified if permissions (ios) and token (android and ios) will requested or not,
		 * - if not, you must call PushNotificationsHandler.requestPermissions() later
		 * - if you are not using remote notification or do not have Firebase installed, use this:
		 *     requestPermissions: Platform.OS === 'ios'
		 */
		requestPermissions: true,
	});
};
