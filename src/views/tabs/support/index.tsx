import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SCREENS } from "../../../constants";
import Header from "../../../components/navigation/Header";
import { strings } from "../../../locales/strings";
import Support from "./Support";
import Policy from "../history/Policy";
import PolicyCheck from "../history/PolicyCheck";
import ContactToTechSupport from "./ContactToTechSupport";

let Stack = createStackNavigator();

export const SupportStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name={SCREENS.support}
				component={Support}
				options={{
					header: ({ navigation }) => (
						<Header
							navigation={navigation}
							close
							title={strings.support}
							round
							alignLeft
						/>
					),
				}}
			/>
			<Stack.Screen
				name={SCREENS.contactToTechSupport}
				component={ContactToTechSupport}
				options={{
					header: ({ navigation }) => (
						<Header
							navigation={navigation}
							close
							title={strings.writeToTechSupport}
							round
							alignLeft
						/>
					),
				}}
			/>
		</Stack.Navigator>
	);
};
