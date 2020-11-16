import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Sos from "./Sos";
import HelpRequest from "./HelpRequest";
import { SCREENS } from "../../../constants";
import Header from "../../../components/navigation/Header";
import { strings } from "../../../locales/strings";
import Map from "./Map";
import InsuredEvents from "./InsuredEvents";

let Stack = createStackNavigator();

export const SosStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name={SCREENS.sos}
				component={Sos}
				options={{
					header: ({ navigation }) => (
						<Header
							title={strings.helpOnWay}
							navigation={navigation}
							back
							round
						/>
					),
				}}
			/>
			<Stack.Screen
				name={SCREENS.insuredEvents}
				component={InsuredEvents}
				options={{
					header: ({ navigation }) => (
						<Header
							title={strings.insuredEvents}
							navigation={navigation}
							back
							round
						/>
					),
				}}
			/>
			<Stack.Screen
				name={SCREENS.helpRequest}
				component={HelpRequest}
				options={{
					header: ({ navigation }) => (
						<Header
							title={strings.requestForHelp}
							navigation={navigation}
							close
							round
							alignLeft
						/>
					),
				}}
			/>
			<Stack.Screen
				name={SCREENS.map}
				component={Map}
				options={{
					header: ({ navigation }) => (
						<Header
							title={strings.selectPlace}
							navigation={navigation}
							close
							round
							alignLeft
						/>
					),
				}}
			/>
		</Stack.Navigator>
	);
};
