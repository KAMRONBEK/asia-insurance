import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { WebView } from "react-native-webview";
import { colors, deviceHeight } from "../../../constants";

let paymentUrl = "http://asiainsurance.uz/main/payme?";

export const Payments = ({ route }) => {
	let { id, user_id, price } = route.params.paymentData;
	// let amount = Math.ceil(price / 100) * 100;

	console.log(
		`${paymentUrl}order_id=${id}&user_id=${user_id}&amount=${price}`,
		price
	);

	return (
		<ScrollView style={styles.container}>
			<WebView
				scrollEnabled={true}
				source={{
					uri: `${paymentUrl}order_id=${id}&user_id=${user_id}&amount=${price}`,
				}}
				style={{
					flex: 0,
					height: deviceHeight,
				}}
				containerStyle={{
					backgroundColor: colors.white,
					paddingVertical: 0,
				}}
			/>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		height: deviceHeight,
	},
	webview: {
		// ...StyleSheet.absoluteFillObject,
		height: deviceHeight,
	},
});
