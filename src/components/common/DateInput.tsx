import React, { useRef, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInputMask, TextInputMaskProps } from "react-native-masked-text";
import { BORDER_RADIUS, colors } from "../../constants";

const DateInput = ({ value, setValue, placeholder, passive }) => {
	let _dateInput = useRef(null);
	let [isValid, setIsValid] = useState(true);

	useEffect(() => {
		if (!value) {
			setIsValid(true);
		} else {
			setIsValid(_dateInput.current.isValid());
			console.log(value);
		}
	}, [value]);

	return (
		<View
			style={[
				styles.container,
				!isValid && {
					borderWidth: 2,
					borderColor: colors.red,
				},
			]}
		>
			<TextInputMask
				//input type iOS
				keyboardType="number-pad"
				editable={!passive}
				ref={_dateInput}
				type={"datetime"}
				options={{
					format: "DD.MM.YYYY",
				}}
				// dont forget to set the "value" and "onChangeText" props
				value={value}
				placeholder={placeholder}
				onChangeText={setValue}
				style={{
					textAlign: "center",
					fontSize: 16,
					color: isValid ? colors.black : colors.red,
					padding: 0,
					margin: 0,
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: BORDER_RADIUS,
		backgroundColor: colors.white,
		justifyContent: "space-between",
		width: "100%",
		padding: 10,
		paddingVertical: 15,
		marginBottom: 20,
		marginTop: 10,
	},
});

export default DateInput;
