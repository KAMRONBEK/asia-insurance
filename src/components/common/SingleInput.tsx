import React, { useState, useEffect } from "react";
import { TextInput as Input, View, StyleSheet, Keyboard } from "react-native";
import { colors, BORDER_RADIUS } from "../../constants";
import { replaceAt } from "../../utils/functions";

const SingleInput = ({
	onErase,
	onEnter,
	inputRef,
	code,
	setCode,
	index,
	...props
}) => {
	// console.warn(inputRef);

	let [value, setValue] = useState("");
	return (
		<View style={styles.container}>
			<Input
				selectTextOnFocus={true}
				ref={inputRef}
				onChangeText={(text) => {
					console.log(text);
					if (text.length <= 1) {
						setValue(text);
						if (!!text) {
							if (onEnter) onEnter();
						}
						setCode(replaceAt(code, index, text));
						if (onEnter) onEnter();
					}
				}}
				// secureTextEntry={true}
				onFocus={() => {
					setValue("");
					setCode(replaceAt(code, index, ""));
				}}
				value={value}
				onKeyPress={({ nativeEvent }) => {
					nativeEvent.key === "Backspace"
						? onErase()
						: () => Keyboard.dismiss();
				}}
				{...props}
				style={styles.input}
				keyboardType="number-pad"
				// editable={value.length != 1}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		// minWidth: 40,
		flex: 1,
		marginHorizontal: 8,
		backgroundColor: colors.white,
		borderRadius: BORDER_RADIUS,
		alignItems: "center",
	},
	input: {
		width: "100%",
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
		paddingVertical: 10,
	},
});

export default SingleInput;
