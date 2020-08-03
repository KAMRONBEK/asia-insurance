import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import "react-native-gesture-handler";
import { AuthStack, MainTabs, PinStack } from "../views";
import { createStackNavigator } from "@react-navigation/stack";
import CustomDrawer from "../components/navigation/CustomDrawer";
import { View, KeyboardAvoidingView } from "react-native";
import { SCREENS } from "../constants";
import { navigationRef } from "../utils/NavigationService";

let Stack = createStackNavigator();

const AppRouter = () => {
	let isAuthenticated = false;
	return (
		<View style={{ flex: 1 }}>
			<NavigationContainer ref={navigationRef}>
				<CustomDrawer>
					<Stack.Navigator headerMode="none">
						{!isAuthenticated && (
							<Stack.Screen
								name={SCREENS.auth}
								component={AuthStack}
							/>
						)}
						<Stack.Screen name={SCREENS.pin} component={PinStack} />
						<Stack.Screen
							name={SCREENS.tabs}
							component={MainTabs}
						/>
					</Stack.Navigator>
				</CustomDrawer>
			</NavigationContainer>
		</View>
	);
};

export default AppRouter;
