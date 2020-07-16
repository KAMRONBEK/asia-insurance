import React from "react";
import { Text as DefualtText, TextProps } from "react-native";

export interface DefualtTextProps {
	children?: any;
}

const Text = ({ style = {}, ...rest }: TextProps & DefualtTextProps) => {
	let fontFamily = "OpenSans-Regular";
	let { fontWeight = "" } = style;
	if (fontWeight.toString().toLowerCase() === "bold")
		fontFamily = "OpenSans-Bold";
	if (fontWeight === "300") {
		fontFamily = "OpenSans-Light";
	}
	if (fontWeight === "500") {
		fontFamily = "OpenSans-SemiBold";
	}
	return (
		<DefualtText {...rest} style={[{ fontFamily }, style]}></DefualtText>
	);
};

export default Text;
