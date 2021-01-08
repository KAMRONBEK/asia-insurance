import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { TextInputMask, TextMask } from "react-native-masked-text";
import { Icons, colors, BORDER_RADIUS } from "../../constants";
import { strings } from "../../locales/strings";
import Text from "./Text";

interface PreValueInputProps {
	preValue?: string;
	icon: string;
	iconAlign?: string;
	setValue?: any;
}

const PreValueInput = ({ preValue, icon, setValue }: PreValueInputProps) => {
	let [inputText, setInputText] = useState();
	return (
		<View style={styles.container}>
			<Text style={styles.inputText}>{preValue}</Text>
			{/* <TextInputMask
				type={"custom"}
				options={{
					mask: "(99) 999 99 99",
				}}
				onChangeText={(text) => {
					setInputText(text);
					setValue(text);
					console.log(text);
				}}
				value={inputText}
				placeholder={strings.enterPhone}
				style={styles.input}
			/> */}
			<TextInput
				onChangeText={(text) => {
					setValue(text);
				}}
				style={styles.input}
				keyboardType="number-pad"
			/>
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
		color: colors.darkBlue,
		fontWeight: "bold",
		padding: 0,
		fontSize: 14,
	},
	inputText: {
		fontSize: 14,
		fontWeight: "bold",
		color: colors.darkBlue,
	},
});

export default PreValueInput;
