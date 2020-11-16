import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Payments from "./Payments";
import { SCREENS } from "../../../constants";
import Header from "../../../components/navigation/Header";
import { strings } from "../../../locales/strings";

let Stack = createStackNavigator();

let PaymentStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name={SCREENS.payments}
				component={Payments}
				options={{
					header: ({ navigation }) => (
						<Header
							navigation={navigation}
							title={strings.myPolicies}
							round
							back
						/>
					),
				}}
			/>
		</Stack.Navigator>
	);
};

export default PaymentStack;
