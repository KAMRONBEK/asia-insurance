import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Products from "./Products";
import AboutInsurance from "./AboutInsurance";
import CalculateCost from "./CalculateCost";
import Cost from "./Cost";
import { SCREENS } from "../../../constants";
import Header from "../../../components/navigation/Header";
import { strings } from "../../../locales/strings";
import News from "./News";
import Selection from "./Selection";
import Checkout from "./Checkout";

let Stack = createStackNavigator();

export const ProductStack = () => {
	return (
		<Stack.Navigator headerMode="screen">
			<Stack.Screen
				options={{
					header: ({ navigation }) => (
						<Header
							title={strings.insuranceProducts}
							navigation={navigation}
						/>
					),
				}}
				name={SCREENS.products}
				component={Products}
			/>
			<Stack.Screen
				options={{
					header: ({ navigation }) => (
						<Header
							title={strings.news}
							back
							navigation={navigation}
						/>
					),
				}}
				name={SCREENS.news}
				component={News}
			/>
			<Stack.Screen
				options={{
					header: () => null,
				}}
				name={SCREENS.calculateCost}
				component={CalculateCost}
			/>
			<Stack.Screen
				options={{
					header: ({ navigation }) => (
						<Header
							navigation={navigation}
							back
							title={strings.aboutInsurance}
							round
						/>
					),
				}}
				name={SCREENS.aboutInsurance}
				component={AboutInsurance}
			/>
			<Stack.Screen
				options={{
					header: ({ navigation }) => null,
				}}
				name={SCREENS.selection}
				component={Selection}
			/>
			<Stack.Screen
				options={{
					header: ({ navigation }) => null,
				}}
				name={SCREENS.checkout}
				component={Checkout}
			/>
			<Stack.Screen
				options={{
					header: ({ navigation }) => (
						<Header
							navigation={navigation}
							back
							title={strings.cost}
							round
						/>
					),
				}}
				name={SCREENS.cost}
				component={Cost}
			/>
		</Stack.Navigator>
	);
};
