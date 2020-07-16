import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "./Profile";
import { SCREENS } from "../../../constants";
import Header from "../../../components/navigation/Header";
import { strings } from "../../../locales/strings";

let Stack = createStackNavigator();

export const ProfileStack = () => {
	return (
		<Stack.Navigator headerMode="none">
			<Stack.Screen name={SCREENS.profile} component={Profile} />
		</Stack.Navigator>
	);
};
