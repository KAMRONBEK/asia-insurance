import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import History from "./History";
import Payouts from "./Payouts";
import Transactions from "./Transactions";
import { SCREENS } from "../../../constants";
import Header from "../../../components/navigation/Header";
import { strings } from "../../../locales/strings";
import Policy from "./Policy";
import PolicyCheck from "./PolicyCheck";
import PolicySelect from "./PolicySelect";
import { Payments } from "../payments/Payments";

let Stack = createStackNavigator();

export const HistoryStack = () => {
	return (
		<Stack.Navigator headerMode="screen">
			<Stack.Screen
				name={SCREENS.policy}
				component={Policy}
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
			<Stack.Screen
				name={SCREENS.policySelect}
				component={PolicySelect}
				options={{
					header: ({ navigation }) => (
						<Header
							navigation={navigation}
							title={strings.policySelection}
							round
							close
							alignLeft
							step={[1, 10]}
						/>
					),
				}}
			/>
			<Stack.Screen
				name={SCREENS.payments}
				component={Payments}
				options={{
					header: ({ navigation }) => (
						<Header
							navigation={navigation}
							title={strings.payment}
							round
							close
							alignLeft
						/>
					),
				}}
			/>
			<Stack.Screen
				name={SCREENS.transactions}
				component={Transactions}
				options={{
					header: ({ navigation }) => (
						<Header
							navigation={navigation}
							title={strings.myOrders}
							round
							back
						/>
					),
				}}
			/>
			<Stack.Screen
				name={SCREENS.policyCheck}
				component={PolicyCheck}
				options={{
					header: ({ navigation }) => (
						<Header
							navigation={navigation}
							title={strings.policyCheck}
							round
							close
							alignLeft
						/>
					),
				}}
			/>
			<Stack.Screen
				options={{
					header: ({ navigation }) => (
						<Header
							title={strings.myOrders}
							navigation={navigation}
							back
							round
						/>
					),
				}}
				name={SCREENS.history}
				component={History}
			/>
			<Stack.Screen
				options={{
					header: ({ navigation }) => null,
				}}
				name={SCREENS.payouts}
				component={Payouts}
			/>
		</Stack.Navigator>
	);
};
