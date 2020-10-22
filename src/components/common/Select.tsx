import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
	BORDER_RADIUS,
	colors,
	Icons,
	CONTAINER_PADDING,
} from "../../constants";
import RNPickerSelect from "react-native-picker-select";
import { TextInput } from "react-native-gesture-handler";
import { Value } from "react-native-reanimated";

interface SelectProps {
	preValue?: string;
	selectedOption?: {};
	options: { label: string; value: {} }[];
	icon?: string;
	placeholder: string;
	selectValue: any;
	onValueChange?: any;
}

const Select = ({
	preValue,
	selectedOption,
	options,
	icon,
	placeholder,
	selectValue,
	onValueChange,
}: SelectProps) => {
	let [value, setValue] = useState("");
	let [containerWidth, setContainerWidth] = useState(0);
	return (
		<RNPickerSelect
			onValueChange={(value) => {
				selectValue(value);
				console.log(value?.id);
				setValue(value);
				console.log(onValueChange);
				if (onValueChange) {
					onValueChange(value?.id);
				}
			}}
			items={options}
			Icon={() => {}}
		>
			<View
				onLayout={(event) => {
					let { x, y, width, height } = event.nativeEvent.layout;
					setContainerWidth(width);
				}}
				style={styles.container}
			>
				{icon && (
					<Icons name={icon} size={20} color={colors.darkBlue} />
				)}
				{/* <TextInput
				onChangeText={(text) => setValue(text)}
				style={[
					styles.text,
					{
						width: containerWidth - 70,
					},
					!icon && {
						paddingLeft: 0,
					},
				]}
				placeholder={placeholder}
			>
				{value}
			</TextInput> */}
				<Text
					style={[
						styles.text,
						!value && {
							color: colors.grayText,
						},
					]}
				>
					{value?.text ? value?.text : placeholder}
				</Text>

				<View>
					<Icons name="chevron-down" size={20} color={colors.gray} />
				</View>
			</View>
		</RNPickerSelect>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white,
		borderRadius: BORDER_RADIUS,
		padding: CONTAINER_PADDING,
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 15,
		justifyContent: "space-between",
	},
	text: {
		paddingHorizontal: 10,
		padding: 0,
		color: colors.darkBlue,
	},
});

export default Select;
