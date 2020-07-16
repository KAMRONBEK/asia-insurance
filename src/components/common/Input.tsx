import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	StyleSheetProperties,
	ViewStyle,
} from "react-native";
import { Icons, colors, BORDER_RADIUS } from "../../constants";
import { TextInput } from "react-native-gesture-handler";

interface InputProps {
	icon?: string;
	placeholder: string;
	value?: string;
	isNumber?: boolean;
	style?: ViewStyle;
	iconColor?: string;
	textColor?: string;
	onSubmit: any;
}

const Input = ({
	icon,
	placeholder,
	value,
	isNumber,
	style,
	iconColor,
	textColor,
	onSubmit,
}: InputProps) => {
	let [text, setText] = useState("");
	return (
		<View style={[styles.container, style]}>
			{icon && (
				<Icons
					name={icon}
					style={styles.icon}
					size={18}
					color={!iconColor ? colors.darkBlue : iconColor}
				/>
			)}
			<TextInput
				keyboardType={!isNumber ? undefined : "number-pad"}
				placeholderTextColor={colors.gray}
				placeholder={placeholder}
				style={[
					styles.input,
					!!icon && {
						paddingRight: 25,
					},
					!!textColor && {
						color: textColor,
					},
				]}
				onChangeText={(text) => {
					setText(text);
				}}
				onSubmitEditing={() => {
					if (!!text) {
						onSubmit(text);
					}
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white,
		borderRadius: BORDER_RADIUS,
		paddingVertical: 15,
		paddingHorizontal: 20,
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 15,
	},
	icon: {
		marginRight: 10,
	},
	input: {
		color: colors.darkBlue,
		fontSize: 14,
		padding: 0,
	},
});

export default Input;
