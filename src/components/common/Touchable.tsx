import React from "react";
import {
	TouchableNativeFeedback,
	TouchableHighlight,
	Platform,
} from "react-native";

interface TouchableProps {
	children: any;
	onPress: any;
}

let Touchable = ({ children, onPress, ...rest }: TouchableProps) => {
	let Body = Platform.select({
		android: () => (
			<TouchableNativeFeedback onPress={onPress} {...rest}>
				{children}
			</TouchableNativeFeedback>
		),
		ios: () => (
			<TouchableHighlight onPress={onPress} {...rest}>
				{children}
			</TouchableHighlight>
		),
	});
	return <Body />;
};

export default Touchable;
