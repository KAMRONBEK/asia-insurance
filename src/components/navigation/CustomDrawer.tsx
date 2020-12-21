import React, { useEffect, useState } from "react";
import {
	Animated,
	Dimensions,
	StyleSheet,
	View,
	Image,
	KeyboardAvoidingView,
	Keyboard,
	TouchableWithoutFeedback,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { connect } from "react-redux";
import {
	colors,
	Icons,
	BORDER_RADIUS,
	SCREENS,
	BIG_BORDER_RADIUS,
} from "../../constants";
import { AppState } from "../../redux/types";
import { toggleMenu } from "../../redux/actions";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from "../../components/common/Text";
import DrawerItem from "./DrawerItem";
import { strings } from "../../locales/strings";
import VersionCheck from "react-native-version-check";
import { navigate } from "../../utils/NavigationService";
import FlashMessage from "../common/FlashMessage";
import { timing } from "react-native-reanimated";
import { requests } from "../../api/requests";
import AsyncStorage from "@react-native-community/async-storage";
import images from "../../assets/images";

type DrawerProps = {
	children: any;
	menuOpen: boolean;
	toggleMenu: Function;
	navigation: any;
};

let { width } = Dimensions.get("window");

const CustomDrawer = ({
	children,
	menuOpen,
	toggleMenu,
	navigation,
	profile,
	user,
}: DrawerProps) => {
	const [animation, setAnimation] = useState(new Animated.Value(0));

	let [points, setPoints] = useState(0);

	let boot = async () => {
		try {
			let res = await requests.ball.getBall();
			if (res.data.data[0]) {
				console.log(res.data.data[0].points);

				setPoints(res.data.data[0].points);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		boot();
		console.log("profile", profile);
		console.log("user", user);
	}, []);

	//changing height while keyboard is on

	//end of keyboard handling
	useEffect(() => {
		Animated.timing(animation, {
			toValue: Number(menuOpen),
			useNativeDriver: true,
		}).start();
	}, [menuOpen]);
	let scale = animation.interpolate({
		inputRange: [0, 1],
		outputRange: [1, 0.7],
	});
	let translateX = animation.interpolate({
		inputRange: [0, 1],
		outputRange: [0, width - 20],
	});
	let borderRadius = animation.interpolate({
		inputRange: [0, 0.1, 1],
		outputRange: [0, 40, 40],
	});

	let logout = () => {
		AsyncStorage.removeItem("@user");
		console.log("logged out");
		navigate(SCREENS.auth, {
			name: SCREENS.loader,
			params: {},
		});
	};

	return (
		<SafeAreaView forceInset={{ top: "always" }} style={{ flex: 1 }}>
			<LinearGradient
				start={{ x: 0, y: 1 }}
				end={{ x: 0, y: 0 }}
				style={StyleSheet.absoluteFillObject}
				colors={[colors.lightBlue, colors.darkBlue]}
			/>
			<View style={[styles.drawerContainer]}>
				<View>
					<View style={styles.avatarContainer}>
						<Image
							source={user.logo ? user.logo : images.logoBg}
							style={styles.avatar}
						/>
						<TouchableWithoutFeedback onPress={toggleMenu}>
							<View style={styles.closeWrapper}>
								<Icons
									name="x"
									size={25}
									color={colors.white}
								/>
							</View>
						</TouchableWithoutFeedback>
					</View>
					<Text style={styles.username}>
						{!!profile.customerName ? profile.customerName : ``}
					</Text>
					<Text style={styles.id}>ID: {user.id}</Text>
				</View>
				<View>
					<DrawerItem
						onPress={() => {
							try {
								navigate(SCREENS.profileStack, {
									name: SCREENS.profile,
									params: {},
								});
							} catch (error) {}
							toggleMenu();
						}}
						iconName={"profile"}
						text={strings.profile}
						size={27}
					/>
					<DrawerItem
						onPress={() => {
							try {
								navigate(SCREENS.tabs, {
									name: SCREENS.historyStack,
									params: {
										screen: SCREENS.policy,
									},
								});
							} catch (error) {}
							toggleMenu();
						}}
						iconName={"shopping-cart"}
						text={strings.history}
					/>
					<DrawerItem
						onPress={() => {
							try {
								navigate(SCREENS.tabs, {
									name: SCREENS.historyStack,
									params: {
										screen: SCREENS.transactions,
									},
								});
							} catch (error) {}
							toggleMenu();
						}}
						iconName={"history"}
						text={strings.myOrders}
					/>
					<DrawerItem
						onPress={() => {
							try {
								navigate(SCREENS.tabs, {
									name: SCREENS.sosStack,
									params: {
										screen: SCREENS.insuredEvents,
									},
								});
							} catch (error) {}
							toggleMenu();
						}}
						iconName={"card-hand"}
						text={strings.insuredEvents}
					/>
					<DrawerItem
						onPress={() => {
							try {
								navigate(SCREENS.tabs, {
									name: SCREENS.historyStack,
									params: {
										screen: SCREENS.policyCheck,
									},
								});
							} catch (error) {}
							toggleMenu();
						}}
						iconName={"search"}
						text={strings.checkHistory}
					/>
					<DrawerItem
						onPress={() => {
							try {
								navigate(SCREENS.sosStack, {
									name: SCREENS.sos,
									params: {},
								});
							} catch (error) {}
							toggleMenu();
						}}
						iconName={"holidays"}
						text={strings.helpOnRoad}
						hasBorder={false}
						size={26}
					/>
				</View>
				<View>
					<Text>
						<Text style={styles.normalBold}>
							{strings.myPoints}
							{": "}
						</Text>
						<Text style={styles.normalLight}>{points} </Text>
						<Text style={styles.borderedRegular}>
							{strings.whatIsThis}
						</Text>
					</Text>
					<View style={styles.logout}>
						<DrawerItem
							text={strings.logout}
							iconName={"logout"}
							hasBorder={false}
							onPress={logout}
						/>
						<Text
							style={{
								...styles.normalLight,
								fontSize: 13,
								textAlignVertical: "center",
							}}
						>{`${
							strings.version
						} ${VersionCheck.getCurrentVersion()} (${VersionCheck.getCurrentBuildNumber()})`}</Text>
					</View>
				</View>
			</View>
			<Animated.View
				pointerEvents={menuOpen ? "none" : "auto"}
				style={{
					flex: 1,
					justifyContent: "center",
					overflow: "hidden",
					borderRadius,
					transform: [{ scale }, { translateX }],
					borderBottomLeftRadius: BIG_BORDER_RADIUS,
					borderBottomRightRadius: BIG_BORDER_RADIUS,
				}}
			>
				{children}
			</Animated.View>
			<FlashMessage />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	drawerContainer: {
		position: "absolute",
		top: 30,
		right: 20,
		left: 20,
		bottom: 0,
		justifyContent: "space-between",
		paddingVertical: 20,
	},
	avatarContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	avatar: {
		width: 85,
		height: 85,
		borderRadius: BORDER_RADIUS,
		borderWidth: 1,
		borderColor: "white",
	},
	username: {
		fontWeight: "bold",
		fontSize: 24,
		color: colors.white,
		marginTop: 10,
	},
	id: {
		fontWeight: "300",
		fontSize: 17,
		color: colors.white,
		marginTop: 10,
	},
	normalBold: {
		fontSize: 17,
		fontWeight: "bold",
		color: colors.white,
	},
	normalLight: {
		fontSize: 17,
		fontWeight: "300",
		color: colors.white,
	},
	borderedRegular: {
		fontSize: 17,
		color: colors.white,
		borderBottomWidth: 1,
		borderColor: colors.white,
		// borderStyle: "dotted",
		marginLeft: 15,
		textDecorationStyle: "dashed",
		textDecorationLine: "underline",
	},
	logout: {
		paddingTop: 50,
		flexDirection: "row",
		justifyContent: "space-between",
		paddingBottom: 10,
	},
	closeWrapper: {
		padding: 15,
	},
});

const mapStateToProps = ({ user, appState: { menuOpen } }) => ({
	menuOpen,
	profile: user.profile,
	user: user.user,
});

const mapDispatchToProps = {
	toggleMenu,
};

const ConnectedCustomDrawer = connect<AppState>(
	mapStateToProps,
	mapDispatchToProps
)(CustomDrawer);

export default ConnectedCustomDrawer;
