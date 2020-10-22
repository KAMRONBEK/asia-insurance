import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Image, StyleSheet, View, StatusBar } from "react-native";
import {
	Transition,
	Transitioning,
	TransitioningView,
} from "react-native-reanimated";
//@ts-ignore
import RoundButton from "../../components/common/RoundButton";
import { colors, SCREENS } from "../../constants";
import { strings } from "../../locales/strings";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParams } from "../";
import images from "../../assets/images";
import {
	showLoading,
	userLoaded,
	hideLoading,
	initUserState,
	profileLoadRedux,
} from "../../redux/actions";
import AsyncStorage from "@react-native-community/async-storage";
import { connect } from "react-redux";

type DefaultNavigationProps = StackNavigationProp<
	AuthStackParams,
	SCREENS.loader
>;

type Props = {
	navigation: DefaultNavigationProps;
};

const Loader = ({
	navigation,
	showLoading,
	hideLoading,
	appState,
	userLoaded,
	initUserState,
	profileLoadRedux,
}: Props) => {
	useEffect(() => {
		StatusBar.setBarStyle("dark-content");
		StatusBar.setBackgroundColor(colors.ultraLightDark);
	}, [navigation]);

	const [loading, setLoading] = useState(true);
	const transitionRef = useRef<TransitioningView | null>();
	const transition = (
		<Transition.Sequence>
			<Transition.Out type="scale" />
			<Transition.Change interpolation="easeInOut" />
			<Transition.In type="fade" />
		</Transition.Sequence>
	);
	useEffect(() => {
		setTimeout(() => {}, 1000);
	}, []);

	const bootstrap = async () => {
		// showLoading(strings.loading);
		try {
			let profile = await AsyncStorage.getItem("@profile");

			if (!!profile) {
				let parsedProfile = JSON.parse(profile);
				if (!!parsedProfile) {
					profileLoadRedux(parsedProfile);
				}
			}

			let storage = await AsyncStorage.getItem("@user");
			if (!!storage) {
				console.log(storage);

				// validate token
				let parsedStorage = JSON.parse(storage);
				let parsedUser = parsedStorage.user;
				if (!!parsedUser.token) {
					console.log(parsedStorage);
					initUserState(parsedStorage);
					setTimeout(() => {
						navigation.navigate(SCREENS.pin);
					}, 200);
				} else {
					console.log("no token");
				}
			} else {
				console.log("storage empty");
				setTimeout(() => {
					if (!!transitionRef.current) {
						transitionRef.current.animateNextTransition();
					}
					setLoading(false);
				}, 100);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		bootstrap();
	}, []);

	useEffect(() => {
		setTimeout(() => {
			if (!!transitionRef.current) {
				transitionRef.current.animateNextTransition();
			}
			setLoading(false);
		}, 1000);
	}, []);

	let defaultPressHandle = () => {
		navigation.navigate(SCREENS.auth);
	};
	return (
		<Transitioning.View
			// ref={transition}
			{...{ ref: (ref) => (transitionRef.current = ref), transition }}
			style={{
				...styles.centeredContainer,
			}}
		>
			<Image source={images.logo} style={styles.logo} />
			{!loading && (
				<>
					<View>
						<RoundButton
							onPress={defaultPressHandle}
							text={strings.ru}
							color={colors.lightBlue}
							fontWeight="500"
							fontSize={18}
						/>
						<RoundButton
							onPress={defaultPressHandle}
							text={strings.uz}
							color={colors.red}
							fontWeight="500"
							fontSize={18}
						/>
					</View>
					<Image source={images.language} style={styles.image} />
				</>
			)}
		</Transitioning.View>
	);
};

let { width } = Dimensions.get("window");
let logoWidth = width - 70;
let imageWidth = width - 100;

const styles = StyleSheet.create({
	logo: {
		width: logoWidth,
		height: logoWidth / 8.8,
	},
	centeredContainer: {
		justifyContent: "space-around",
		alignItems: "center",
		flex: 1,
		backgroundColor: colors.ultraLightDark,
	},
	image: {
		width: imageWidth,
		height: imageWidth / 1.02,
	},
});

const mapStateToProps = ({ appState }) => ({ appState });

const mapDispatchToProps = {
	hideLoading,
	showLoading,
	initUserState,
	userLoaded,
	profileLoadRedux,
};

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
