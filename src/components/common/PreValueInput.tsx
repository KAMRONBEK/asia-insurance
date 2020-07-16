import React from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Icons, colors, BORDER_RADIUS } from "../../constants";
import Text from "./Text";

interface PreValueInputProps {
	preValue?: string;
	icon: string;
	iconAlign?: string;
}

const PreValueInput = ({ preValue, icon }: PreValueInputProps) => {
	return (
		<View style={styles.container}>
			<Text style={styles.inputText}>{preValue}</Text>
			<TextInput style={styles.input} keyboardType="name-phone-pad" />
			<Icons name={icon} size={25} color={colors.gray} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		backgroundColor: colors.white,
		borderRadius: BORDER_RADIUS,
		alignItems: "center",
		paddingHorizontal: 15,
		paddingVertical: 10,
	},
	input: {
		flex: 1,
	},
	inputText: {
		fontSize: 14,
		fontWeight: "bold",
		color: colors.darkBlue,
	},
});

export default PreValueInput;
