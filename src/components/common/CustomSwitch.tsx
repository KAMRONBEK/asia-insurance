import React from "react";
import { Switch } from "react-native";
import { colors } from "../../constants";

interface CustomSwitchProps {
	value: boolean;
	onValueChange: (value: boolean) => void;
}

let CustomSwitch = ({ value, onValueChange }: CustomSwitchProps) => (
	<Switch
		trackColor={{
			false: colors.paleGray,
			true: colors.paleGray,
		}}
		thumbColor={value ? colors.red : colors.gray}
		style={{ marginLeft: "auto" }}
		value={value}
		onValueChange={onValueChange}
	/>
);

export default CustomSwitch;
