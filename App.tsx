import React, { useEffect } from "react";
import AppRouter from "./src/routes/AppRouter";
import { Provider } from "react-redux";
import configureStore from "./src/redux/configureStore";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Platform, UIManager } from "react-native";
import { configureAxios } from "./src/api/config";
import Loading from "./src/components/container/Loading";

if (Platform.OS === "android") {
	if (UIManager.setLayoutAnimationEnabledExperimental) {
		UIManager.setLayoutAnimationEnabledExperimental(true);
	}
}

const App = () => {
	let store = configureStore();
	configureAxios(store);
	return (
		<SafeAreaProvider>
			<Provider store={store}>
				<AppRouter />
				<Loading />
			</Provider>
		</SafeAreaProvider>
	);
};

export default App;
