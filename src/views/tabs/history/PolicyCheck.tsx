import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Keyboard } from "react-native";
import RoundButton from "../../../components/common/RoundButton";
import { strings } from "../../../locales/strings";
import { CONTAINER_PADDING, deviceWidth, colors } from "../../../constants";
import images from "../../../assets/images";
import Input from "../../../components/common/Input";

const PolicyCheck = () => {
	let [inputMode, setInputMode] = useState(false);
	const onKeyboardDidShow = (e: KeyboardEvent): void => {
		setInputMode(true);
	};

	const onKeyboardDidHide = (): void => {
		setInputMode(false);
	};

	useEffect(() => {
		Keyboard.addListener("keyboardDidShow", onKeyboardDidShow);
		Keyboard.addListener("keyboardDidHide", onKeyboardDidHide);
		return (): void => {
			Keyboard.removeListener("keyboardDidShow", onKeyboardDidShow);
			Keyboard.removeListener("keyboardDidHide", onKeyboardDidHide);
		};
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<Input
					placeholder={
						strings.enterPolicyNumber + " " + strings.osago
					}
					icon="edit"
					iconColor={colors.gray}
					textColor={colors.black}
				/>
				<View style={styles.buttonWrapper}>
					<RoundButton gradient text={strings.checkPolicy} />
				</View>
			</View> 
			{!inputMode && (
				<Image style={styles.image} source={images.ladyWorking} />
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-between",
		backgroundColor: colors.ultraLightDark,
	},
	content: {
		justifyContent: "space-between",
		flex: 1,
		paddingHorizontal: CONTAINER_PADDING,
		paddingTop: 50,
	},
	buttonWrapper: {
		paddingHorizontal: 3 * CONTAINER_PADDING,
	},
	image: {
		width: deviceWidth,
		height: 350,
		resizeMode: "contain",
		marginBottom: -110,
	},
});

export default PolicyCheck;
