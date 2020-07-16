import React, { useState } from "react";
import { TextInput as Input, View, StyleSheet } from "react-native";
import { colors, BORDER_RADIUS } from "../../constants";

const SingleInput = ({ onErase, onEnter, inputRef, ...props }) => {
	// console.warn(inputRef);
	let [value, setValue] = useState("");
	return (
		<View style={styles.container}>
			<Input
				selectTextOnFocus={true}
				ref={inputRef}
				onChangeText={(text) => {
					if (!!text) {
						if (onEnter) onEnter();
						setValue(text);
					}
				}}
				onKeyPress={({ nativeEvent }) => {
					nativeEvent.key === "Backspace"
						? onErase()
						: console.warn("sila");
				}}
				{...props}
				style={styles.input}
				keyboardType="number-pad"
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		minWidth: 60,
		backgroundColor: colors.white,
		borderRadius: BORDER_RADIUS,
		alignItems: "center",
	},
	input: {
		width: 20,
		fontSize: 20,
		fontWeight: "bold",
	},
});

export default SingleInput;
