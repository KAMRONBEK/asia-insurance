import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { colors, CONTAINER_PADDING } from "../../constants";

const InPageHeader = ({ title }) => {
	return (
		<LinearGradient
			start={{ x: 0, y: 1 }}
			end={{ x: 1, y: 0 }}
			colors={[colors.lightBlue, colors.darkBlue]}
			style={styles.container}
		>
			<Text style={styles.text}>{title}</Text>
		</LinearGradient>
	);
};

export default InPageHeader;

const styles = StyleSheet.create({
	container: {
		height: 60,
		justifyContent: "center",
		paddingHorizontal: CONTAINER_PADDING,
	},
	text: {
		fontSize: 16,
		color: colors.white,
		textTransform: "uppercase",
	},
});
