import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import CustomTabbar from "../components/navigation/CustomTabbar";
import { colors, Icons, SCREENS } from "../constants/index";
import { Auth, Loader, Pin } from "./auth";
import { ProductStack } from "./tabs/products";
import { HistoryStack } from "./tabs/history";
import { SosStack } from "./tabs/sos";
import { SupportStack } from "./tabs/support";
import { ProfileStack } from "./tabs/profile";
import Header from "../components/navigation/Header";
import CustomDrawer from "../components/navigation/CustomDrawer";

export type AuthStackParams = {
	[SCREENS.loader]: undefined;
	[SCREENS.auth]: undefined;
	[SCREENS.pin]: undefined;
};

let Tabs = createBottomTabNavigator();
let Stack = createStackNavigator<AuthStackParams>();

export const AuthStack = () => {
	return (
		<Stack.Navigator headerMode="none">
			{/* fix */}
			<Stack.Screen name={SCREENS.loader} component={Loader} />
			<Stack.Screen name={SCREENS.auth} component={Auth} />
		</Stack.Navigator>
	);
};
export const PinStack = () => {
	return (
		<Stack.Navigator headerMode="none">
			<Stack.Screen name={SCREENS.pin} component={Pin} />
		</Stack.Navigator>
	);
};

export const MainTabs = () => {
	return (
		<CustomDrawer>
			<Tabs.Navigator tabBar={(props) => <CustomTabbar {...props} />}>
				<Tabs.Screen
					component={ProductStack}
					name={SCREENS.productsStack}
					options={{
						tabBarIcon: ({ focused }) => (
							<Icons
								name="newspaper"
								size={24}
								color={focused ? colors.white : colors.gray}
							/>
						),
						title: "My home",
					}}
				/>
				<Tabs.Screen
					component={HistoryStack}
					name={SCREENS.historyStack}
					options={{
						tabBarIcon: ({ focused }) => (
							<Icons
								name="form"
								size={24}
								color={focused ? colors.white : colors.gray}
							/>
						),
					}}
				/>
				<Tabs.Screen
					component={SosStack}
					name={SCREENS.sosStack}
					options={{
						tabBarIcon: ({ focused }) => (
							<Icons
								name="signal"
								size={24}
								color={focused ? colors.white : colors.gray}
							/>
						),
					}}
				/>
				<Tabs.Screen
					component={SupportStack}
					name={SCREENS.supportStack}
					options={{
						tabBarIcon: ({ focused }) => (
							<Icons
								name="headphone"
								size={24}
								color={focused ? colors.white : colors.gray}
							/>
						),
					}}
				/>
				<Tabs.Screen
					component={ProfileStack}
					name={SCREENS.profileStack}
					options={{
						tabBarIcon: ({ focused }) => (
							<Icons
								name="lock-shield"
								size={24}
								color={focused ? colors.white : colors.gray}
							/>
						),
					}}
				/>
			</Tabs.Navigator>
		</CustomDrawer>
	);
};
