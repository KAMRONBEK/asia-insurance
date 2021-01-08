import React, { useState, useEffect } from "react";
import {
	View,
	StyleSheet,
	TouchableWithoutFeedback,
	GestureResponderEvent,
	Dimensions,
	Clipboard,
	Linking,
	Keyboard,
} from "react-native";
import { colors } from "../../constants";
import Text from "./Text";
import LinearGradient from "react-native-linear-gradient";
import Touchable from "./Touchable";
import { showFlashMessage } from "../../redux/actions";
import { connect } from "react-redux";
import { strings } from "../../locales/strings";
import { TouchableOpacity } from "react-native-gesture-handler";

export interface ButtonProps {
	onPress?: ((event: GestureResponderEvent) => void) | undefined;
	onPressIn?: ((event: GestureResponderEvent) => void) | undefined;
	text?: string;
	color?: string;
	backgroundColor?: string;
	fontWeight?:
		| "bold"
		| "normal"
		| "100"
		| "200"
		| "300"
		| "400"
		| "500"
		| "600"
		| "700"
		| "800"
		| "900"
		| undefined;
	gradient?: boolean;
	fontSize?: number;
	radius?: number;
	number?: string;
	showFlashMessage: any;
	passive?: boolean;
}

const RoundButton = ({
	gradient,
	onPress,
	onPressIn,
	text,
	color = colors.white,
	backgroundColor = colors.ultraLightBlue,
	fontWeight = "400",
	fontSize,
	radius,
	number,
	showFlashMessage,
	passive,
}: ButtonProps) => {
	let [buttonBorderColor, setButtonBorderColor] = useState(color);
	let [backColor, setBackColor] = useState(backgroundColor);
	let [buttonText, setButtonText] = useState(text);
	let [buttonTextColor, setButtonTextColor] = useState(color);

	const [show, setShow] = useState(true);

	useEffect(() => {
		Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
		Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

		return () => {
			Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
			Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
		};
	}, []);

	const _keyboardDidShow = () => {
		setShow(false);
	};

	const _keyboardDidHide = () => {
		setShow(true);
	};

	return (
		<View>
			{show && (
				<TouchableOpacity
					onPressIn={onPressIn}
					onPress={
						!passive
							? !number
								? onPress
								: () => {
										if (buttonText == number) {
											Linking.openURL(`tel:${number}`);
										}
										setButtonBorderColor(colors.darkBlue);
										setBackColor(colors.white);
										setButtonText(number);
										setButtonTextColor(colors.darkBlue);
										Clipboard.setString(number);
										showFlashMessage({
											message:
												strings.copiedToClipboard +
												":" +
												number,
											type: colors.green,
										});
								  }
							: undefined
					}
				>
					<View
						style={[
							styles.plane,
							!!radius && {
								borderRadius: radius,
							},
							buttonBorderColor != colors.white && {
								borderColor: buttonBorderColor,
								borderWidth: 2,
							},
						]}
					>
						<LinearGradient
							start={{ x: 0, y: 1 }}
							end={{ x: 1, y: 0 }}
							colors={
								!passive
									? gradient
										? [colors.lightBlue, colors.darkBlue]
										: [backColor, backColor]
									: [colors.gray, colors.grayText]
							}
							style={{
								...styles.container,
								backgroundColor: backColor,
							}}
						>
							<Text
								style={{
									...styles.text,

									fontWeight,
									fontSize,
									color: buttonTextColor,
								}}
							>
								{buttonText}
							</Text>
						</LinearGradient>
					</View>
				</TouchableOpacity>
			)}
		</View>
	);
};
const styles = StyleSheet.create({
	plane: {
		borderRadius: 40,
		marginBottom: 20,
		overflow: "hidden",
	},
	container: {
		justifyContent: "center",
		alignItems: "center",
		padding: 15,
		minWidth: Dimensions.get("window").width - 150,
	},
	text: {
		fontSize: 16,
	},
});

const mapStateToProps = ({ appState: { flashMessage, flashMessageType } }) => ({
	flashMessage,
	flashMessageType,
});
const mapDispatchToProps = {
	showFlashMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(RoundButton);
