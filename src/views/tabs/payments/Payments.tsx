import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { colors, deviceHeight } from "../../../constants";

export const Payments = () => {
	return (
		<View style={styles.container}>
			<WebView
				source={{
					uri:
						"https://payme.uz/fallback/merchant/?id=5ccc0ff9167ca1553c2bcee3",
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
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	webview: {
		...StyleSheet.absoluteFillObject,
	},
});
