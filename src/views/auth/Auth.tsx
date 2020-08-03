import React, { useRef, useState, useEffect } from "react";
import {
	Dimensions,
	ScrollView,
	StyleSheet,
	View,
	BackHandler,
	StatusBar,
} from "react-native";
//@ts-ignore
import RoundButton from "../../components/common/RoundButton";
import { colors, SCREENS } from "../../constants";
import { strings } from "../../locales/strings";
import Intros, { Intro } from "./Intros";
import { Login } from "./Login";
import { toggleMenu, userLoaded, userLoggedIn } from "../../redux/actions";
import { connect } from "react-redux";
import images from "../../assets/images";
import { navigate } from "../../utils/NavigationService";
import { requests } from "../../api/requests";

//* Our staticly typed intros
let introsData: Intro[] = [
	{
		content: strings.sliderNote1,
		title: strings.sliderText1,
		imageSource: images.slider1,
		imageRatio: 0.92,
	},
	{
		content: strings.sliderNote2,
		title: strings.sliderText2,
		imageSource: images.slider2,
		imageRatio: 1.04,
	},
];

const Auth = ({ toggleMenu, navigation, userLoaded, user, userLoggedIn }) => {
	useEffect(() => {
		StatusBar.setBarStyle("dark-content");
		StatusBar.setBackgroundColor(colors.ultraLightDark);
	}, [navigation]);

	//* Made for little animation of scroll
	let scroll = [
		useRef<ScrollView>(null),
		useRef<ScrollView>(null),
		useRef<ScrollView>(null),
	];
	//*
	const [current, setCurrent] = useState(0);
	//* For scrolling from Intros to Login
	const ref = useRef<ScrollView>(null);
	//* Indicates if the next animation should be Login page
	let nextIsLogin = current + 1 === introsData.length;
	//*
	let [isLogin, setIsLogin] = useState(false);
	let [loginIndex, setLoginIndex] = useState(0);
	/**
	 ** Scrolls to next page or drives an animation
	 */
	let [buttonText, setButtonText] = useState(strings.next);

	let proceed = () => {
		let currentRef = 0;
		let newValue = current >= introsData.length ? 0 : current + 1;

		if (nextIsLogin) {
			//* next should be Login and we should not be able to scroll next
			ref.current?.scrollTo({ x: width * 2 });
			setIsLogin(true);
			setButtonText(strings.send);
			return;
		}
		//* scroll each IntroData container (ScrollView)
		let id = setInterval(() => {
			scroll[currentRef].current?.scrollTo({ x: width * newValue });
			currentRef++;
		}, 300);
		//* remove scroll interval
		setTimeout(() => {
			clearInterval(id);
			currentRef = 0;
		}, 350);
		setCurrent(newValue);
	};

	let [phoneNumber, setPhoneNumber] = useState("");
	let [code, setCode] = useState("");
	let login = async () => {
		if (loginIndex == 0) {
			setLoginIndex(loginIndex + 1);
			setButtonText(strings.confirm);
			try {
				let res = await requests.auth.login({
					phone: phoneNumber,
					device_token: "test123",
				});
				console.log(res.data.data);
				let profileRes = await requests.user.profile(
					res.data.data.token
				);
				if (profileRes) {
					userLoaded(profileRes.data.data);
				}
				console.log(profileRes.data.data);
			} catch (error) {
				console.log(error.response);
			}
		}
		if (loginIndex == 1) {
			try {
				let res = await requests.auth.verifyCode({ code: code });
				console.log("here");

				console.log(res.data);
				userLoggedIn(res.data.data);
				navigation.navigate(SCREENS.pin, {
					name: SCREENS.pin,
					params: {},
				});
			} catch (error) {
				console.log(error.response.message);
			}
		}
		// if (loginIndex != 1) {
		// 	setLoginIndex(loginIndex + 1);
		// 	setButtonText(strings.confirm);
		// } else {
		// 	navigate(SCREENS.auth, {
		// 		name: SCREENS.pin,
		// 		params: {},
		// 	});
		// }
	};

	useEffect(() => {
		console.log(user);
	}, [user]);

	return (
		<View style={styles.plane}>
			<ScrollView
				{...{ ref }}
				horizontal
				showsHorizontalScrollIndicator={false}
				pagingEnabled
				scrollEnabled={false}
			>
				{/**
				 * Intros
				 */}
				<View style={styles.fullWidth}>
					<Intros {...{ current, scroll, introsData }} />
				</View>
				{/**
				 * * Since we have bottom button Login should not have button
				 */}
				<View style={styles.fullWidth}>
					<Login
						index={loginIndex}
						navigation={navigation}
						setPhoneNumber={setPhoneNumber}
						code={code}
						setCode={setCode}
					/>
				</View>
			</ScrollView>
			<RoundButton
				// * Since login does not have button we implement login logic here
				text={buttonText}
				backgroundColor={colors.darkBlue}
				color={colors.white}
				fontWeight="400"
				onPress={!isLogin ? proceed : login}
				passive={isLogin && phoneNumber.length < 9}
			/>
		</View>
	);
};

let { width } = Dimensions.get("window");

const styles = StyleSheet.create({
	plane: {
		flex: 1,
		alignItems: "center",
		backgroundColor: colors.ultraLightDark,
	},
	container: {
		flex: 1,
		justifyContent: "space-around",
		alignItems: "center",
	},
	fullWidth: {
		width,
		justifyContent: "center",
		alignItems: "center",
		flex: 1,
		paddingBottom: 30,
	},
});

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = {
	toggleMenu,
	userLoaded,
	userLoggedIn,
};

const connectedAuth = connect(mapStateToProps, mapDispatchToProps)(Auth);
export default connectedAuth;
