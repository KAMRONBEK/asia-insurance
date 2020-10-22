import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Keyboard } from "react-native";
import RoundButton from "../../../components/common/RoundButton";
import { strings } from "../../../locales/strings";
import { CONTAINER_PADDING, deviceWidth, colors } from "../../../constants";
import images from "../../../assets/images";
import Input from "../../../components/common/Input";
import { onChange } from "react-native-reanimated";
import { requests } from "../../../api/requests";

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

	let [input, setInput] = useState("");
	let [result, setResult] = useState("");

	const onCheckPress = async () => {
		let res = await requests.policy.checkPolicy({
			PolicySery: input.substring(0, 2),
			PolicyNumber: input.substring(3, input.length),
		});
		console.log(res.data);
		setResult(res.data.message);
	};

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<Input
					placeholder={
						strings.enterPolicyNumber + " " + strings.osago
					}
					icon="edit"
					setValue={setInput}
					iconColor={colors.gray}
					textColor={colors.black}
				/>
				{!!result && (
					<View
						style={{
							padding: 10,
						}}
					>
						<Text>{result}</Text>
					</View>
				)}
				<View style={styles.buttonWrapper}>
					<RoundButton
						onPress={onCheckPress}
						gradient
						text={strings.checkPolicy}
						passive={input.length < 4}
					/>
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
