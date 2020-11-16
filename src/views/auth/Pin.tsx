import React, { useState, useRef, useEffect } from "react";
import {
	StyleSheet,
	View,
	TextInput,
	Image,
	ScrollView,
	Keyboard,
} from "react-native";
import {
	Icons,
	colors,
	deviceWidth,
	CONTAINER_PADDING,
	deviceHeight,
	SCREENS,
} from "../../constants";
import Text from "../../components/common/Text";
import { strings } from "../../locales/strings";
import SingleInput from "../../components/common/SingleInput";
import RoundButton from "../../components/common/RoundButton";
import images from "../../assets/images";
import { connect } from "react-redux";
import {
	setPinCode,
	showFlashMessage,
	showLoading,
	profileLoadRedux,
} from "../../redux/actions";
import AsyncStorage from "@react-native-community/async-storage";

const Pin = ({
	navigation,
	setPinCode,
	user,
	showFlashMessage,
	showLoading,
}) => {
	let [pinCode, setPin] = useState("");
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
		console.log(pinCode);
	}, [pinCode]);

	const onPress = async () => {
		let profile = await AsyncStorage.getItem("@profile");

		if (!!profile) {
			let parsedProfile = JSON.parse(profile);
			if (!!parsedProfile) {
				profileLoadRedux(parsedProfile);
			}
		}

		let storage = await AsyncStorage.getItem("@user");
		if (!!storage) {
			let parsedStorage = JSON.parse(storage);
			if (!!parsedStorage.pinCode) {
				//storage has pin
				console.log("storage has pin");
				if (parsedStorage.pinCode == pinCode) {
					//entered pin is same as storage pin
					console.log("entered pin is same as storage pin");
					showLoading(strings.loading);
					showFlashMessage({
						type: colors.green,
						message: strings.correctPin,
					});
					navigation.navigate(SCREENS.tabs, {
						screen: SCREENS.products,
						params: {},
					});
				} else {
					//entered pin is wrong
					console.log("entered pin is wrong", parsedStorage.pinCode);
					showFlashMessage({
						type: colors.red,
						message: strings.wrongPin,
					});
				}
			} else {
				//storage has no pin set a new one
				console.log("storage has no pin set a new one");
				setPinCode(pinCode);
				showLoading(strings.loading);
				navigation.navigate(SCREENS.tabs, {
					screen: SCREENS.products,
					params: {},
				});
			}
		} else {
			console.log("no user in storage");
		}
	};

	return (
		<View style={{ flex: 1 }}>
			<ScrollView style={{ flex: 1 }}>
				<View style={styles.container}>
					<View style={styles.top}>
						<Image source={images.logo} style={styles.logo} />
						<Image
							source={images.shield}
							style={styles.languageImage}
						/>
					</View>
					<View style={styles.middle}>
						<Text style={styles.title}>{strings.enterPin}</Text>
						<Text style={styles.content}>
							{strings.enterPinInfo}
						</Text>
						<Icons
							name="code"
							color={colors.darkBlue}
							size={20}
							style={{ paddingTop: 10 }}
						/>
					</View>
					<View style={[styles.bottom]}>
						<View style={styles.multiInput}>
							<SingleInput
								code={pinCode}
								setCode={setPin}
								inputRef={inputRefs[0]}
								onEnter={() => {
									inputRefs[1].current.focus();
								}}
								onErase={() => inputRefs[0].current.focus()}
								index={0}
							/>
							<SingleInput
								code={pinCode}
								setCode={setPin}
								inputRef={inputRefs[1]}
								onEnter={() => {
									inputRefs[2].current.focus();
								}}
								onErase={() => inputRefs[0].current.focus()}
								index={1}
							/>
							<SingleInput
								code={pinCode}
								setCode={setPin}
								inputRef={inputRefs[2]}
								onEnter={() => {
									inputRefs[3].current.focus();
								}}
								onErase={() => inputRefs[1].current.focus()}
								index={2}
							/>
							<SingleInput
								code={pinCode}
								setCode={setPin}
								inputRef={inputRefs[3]}
								onErase={() => inputRefs[2].current.focus()}
								onEnter={() => {
									Keyboard.dismiss();
								}}
								index={3}
							/>
						</View>
					</View>
					<View
						style={{
							alignItems: "center",
							paddingTop: 40,
						}}
					>
						<RoundButton
							text={strings.confirm}
							backgroundColor={colors.darkBlue}
							color={colors.white}
							fontWeight="400"
							onPress={onPress}
						/>
					</View>
				</View>
			</ScrollView>
		</View>
	);
};
let logoWidth = deviceWidth - 100;
let imageWidth = deviceWidth - 150;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		// height: deviceHeight,
		paddingHorizontal: CONTAINER_PADDING,
		backgroundColor: colors.ultraLightBlue,
		justifyContent: "space-between",
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

const mapStateToProps = ({ user }) => ({
	user,
});

const mapDispatchToProps = { setPinCode, showFlashMessage, showLoading };

export default connect(mapStateToProps, mapDispatchToProps)(Pin);
