import React, { useEffect, useState, useRef } from "react";
import {
	View,
	StyleSheet,
	Image,
	StatusBar,
	Keyboard,
	TextInput,
	TouchableOpacity,
	ScrollView,
	KeyboardAvoidingView,
} from "react-native";
import images from "../../assets/images";
import {
	colors,
	deviceWidth,
	deviceHeight,
	CONTAINER_PADDING,
} from "../../constants";
import { strings } from "../../locales/strings";
import Text from "../../components/common/Text";
import { Icons } from "../../constants/index";
import PreValueInput from "../../components/common/PreValueInput";
import MultiInputWrapper from "../../components/common/MultiInputWrapper";
import SingleInput from "../../components/common/SingleInput";

let loginData = [
	{
		title: strings.enterPhone,
		content: strings.enterPhoneInfo,
		input: true,
	},
	{
		title: strings.enterCode,
		content: strings.enterCodeInfo,
		logo: "password",
		multiInput: true,
		countDown: 30,
	},
];

export const Login = ({ index, navigation, setPhoneNumber, code, setCode }) => {
	let [counter, setCounter] = useState(
		!!loginData[index].countDown ? loginData[index].countDown : 30
	);
	let [inputMode, setInputMode] = useState(false);

	setTimeout(() => {
		if (counter != 0 && loginData[index].countDown) {
			setCounter(counter - 1);
		}
	}, 1000);

	//multiInput refs
	let [inputRefs] = useState([
		useRef<TextInput>(null),
		useRef<TextInput>(null),
		useRef<TextInput>(null),
		useRef<TextInput>(null),
		useRef<TextInput>(null),
		useRef<TextInput>(null),
	]);

	useEffect(() => {
		StatusBar.setBarStyle("dark-content");
		StatusBar.setBackgroundColor(colors.ultraLightDark);
	}, []);
	return (
		<KeyboardAvoidingView behavior={"position"}>
			<View style={{ flex: 1 }}>
				<ScrollView style={{ flex: 1 }}>
					<View style={styles.container}>
						{!inputMode && (
							<View style={styles.top}>
								<Image
									source={images.logo}
									style={styles.logo}
								/>
								<Image
									source={images.shield}
									style={styles.languageImage}
								/>
							</View>
						)}
						<View style={styles.middle}>
							<Text style={styles.title}>
								{loginData[index].title}
							</Text>
							<Text style={styles.content}>
								{loginData[index].content}
							</Text>
							{!!loginData[index].logo && (
								<Icons
									name="code"
									color={colors.darkBlue}
									size={20}
									style={{ paddingTop: 10 }}
								/>
							)}
						</View>
						<View
							style={[
								styles.bottom,
								!loginData[index].input && {
									justifyContent: "space-around",
									paddingTop: 0,
								},
							]}
						>
							{loginData[index].input && (
								<PreValueInput
									preValue="+998"
									icon="phone"
									setValue={setPhoneNumber}
								/>
							)}
							{loginData[index].multiInput && (
								<View style={styles.multiInput}>
									<SingleInput
										code={code}
										setCode={setCode}
										inputRef={inputRefs[0]}
										onEnter={() => {
											inputRefs[1].current.focus();
										}}
										onErase={() =>
											inputRefs[0].current.focus()
										}
										index={0}
									/>
									<SingleInput
										code={code}
										setCode={setCode}
										inputRef={inputRefs[1]}
										onEnter={() => {
											inputRefs[2].current.focus();
										}}
										onErase={() =>
											inputRefs[0].current.focus()
										}
										index={1}
									/>
									<SingleInput
										code={code}
										setCode={setCode}
										inputRef={inputRefs[2]}
										onEnter={() => {
											inputRefs[3].current.focus();
										}}
										onErase={() =>
											inputRefs[1].current.focus()
										}
										index={2}
									/>
									<SingleInput
										code={code}
										setCode={setCode}
										inputRef={inputRefs[3]}
										onEnter={() => {
											inputRefs[4].current.focus();
										}}
										onErase={() =>
											inputRefs[2].current.focus()
										}
										index={3}
									/>
									<SingleInput
										code={code}
										setCode={setCode}
										inputRef={inputRefs[4]}
										onEnter={() => {
											inputRefs[5].current.focus();
										}}
										onErase={() =>
											inputRefs[3].current.focus()
										}
										index={4}
									/>
									<SingleInput
										code={code}
										setCode={setCode}
										inputRef={inputRefs[5]}
										onErase={() =>
											inputRefs[4].current.focus()
										}
										index={5}
									/>
								</View>
							)}
							{loginData[index].countDown && counter != 0 ? (
								<Text style={styles.count}>
									{strings.askAnotherCode}{" "}
									<Text style={styles.countColored}>
										{counter} {strings.sek}
									</Text>
								</Text>
							) : (
								loginData[index].countDown && (
									<TouchableOpacity>
										<Text
											style={[
												styles.count,
												{
													color: colors.darkBlue,
												},
											]}
										>
											{strings.askForCode}
										</Text>
									</TouchableOpacity>
								)
							)}
						</View>
					</View>
				</ScrollView>
			</View>
		</KeyboardAvoidingView>
	);
};

let logoWidth = deviceWidth - 100;
let imageWidth = deviceWidth - 150;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: CONTAINER_PADDING,
		backgroundColor: colors.ultraLightDark,
	},
	top: {
		paddingTop: 30,
		justifyContent: "space-between",
		alignItems: "center",
		height: deviceHeight * 0.43,
		// height: deviceHeight * 0,
	},
	logo: {
		width: logoWidth,
		height: logoWidth / 8.8,
	},
	languageImage: {
		width: imageWidth,
		height: imageWidth / 1.4,
		resizeMode: "contain",
	},
	middle: {
		alignItems: "center",
		paddingHorizontal: 10,
		height: deviceHeight * 0.22,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		paddingVertical: 20,
	},
	content: {
		fontSize: 15,
		fontWeight: "300",
		textAlign: "center",
	},
	bottom: {
		flex: 1,
		paddingTop: 20,
	},
	count: {
		textAlign: "center",
		fontWeight: "bold",
		color: colors.darkGray,
	},
	countColored: {
		fontWeight: "bold",
		color: colors.red,
	},
	multiInput: {
		flexDirection: "row",
		justifyContent: "space-around",
	},
});
