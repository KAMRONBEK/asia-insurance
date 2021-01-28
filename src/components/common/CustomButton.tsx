import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../constants";

const CustomButton = ({ text, onPress, backgroundColor, color, border }) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<View
				style={[
					styles.container,
					backgroundColor && {
						backgroundColor: backgroundColor,
					},
					border &&
						color && {
							borderWidth: 2,
							borderColor: color,
						},
				]}
			>
				<Text
					style={[
						styles.text,
						color && {
							color: color,
						},
					]}
				>
					{text}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 40,
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		fontSize: 11,
		fontWeight: "600",
		textAlign: "center",
		textTransform: "uppercase",
	},
});

export default CustomButton;
