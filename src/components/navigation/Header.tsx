import React from "react";
import { StyleSheet, View, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { colors, Icons, SCREENS, deviceWidth } from "../../constants";
import { toggleMenu } from "../../redux/actions";
import { connect } from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import images from "../../assets/images";
import { TouchableOpacity } from "react-native-gesture-handler";
import Text from "../common/Text";
import { strings } from "../../locales/strings";
import { BIG_BORDER_RADIUS } from "../../constants";
import { navigate } from "../../utils/NavigationService";

interface HeaderProps {
	title: string;
	toggleMenu: any;
	round?: boolean;
	back?: boolean;
	navigation: any;
	tall?: boolean;
	alignLeft?: boolean;
	close?: boolean;
	step?: [number, number];
}

const Header = ({
	title,
	toggleMenu,
	round,
	back,
	navigation,
	tall,
	alignLeft,
	close,
	step,
}: HeaderProps) => {
	const onMenuPress = () => {
		toggleMenu();
	};
	const onBackPress = () => {
		navigation.goBack();
	};

	const onUserPress = () => {
		navigate(SCREENS.profileStack, {
			name: SCREENS.profile,
			params: {},
		});
	};

	return (
		<View style={[styles.plane]}>
			<LinearGradient
				start={{ x: 0, y: 1 }}
				end={{ x: 0, y: 0 }}
				colors={[colors.lightBlue, colors.darkBlue]}
				style={[
					styles.container,
					tall && {
						paddingBottom: 60,
					},
					round && {
						borderBottomLeftRadius: BIG_BORDER_RADIUS,
						borderBottomRightRadius: BIG_BORDER_RADIUS,
					},
					!!alignLeft && {
						justifyContent: "flex-start",
					},
				]}
			>
				{back || close ? (
					back ? (
						<TouchableOpacity onPress={onBackPress}>
							<View style={styles.iconWrapper}>
								<Icons name="arrow-left" color={colors.white} />
							</View>
						</TouchableOpacity>
					) : (
						<TouchableOpacity onPress={onBackPress}>
							<View style={styles.iconWrapper}>
								<Icons
									name="x"
									color={colors.white}
									size={25}
								/>
							</View>
						</TouchableOpacity>
					)
				) : (
					<TouchableOpacity onPress={onMenuPress}>
						<View style={styles.iconWrapper}>
							<Image source={images.menu} style={styles.menu} />
						</View>
					</TouchableOpacity>
				)}
				<View style={styles.titleWrapper}>
					<Text numberOfLines={1} style={styles.title}>
						{title}
					</Text>
				</View>
				<View
					style={[
						{ paddingLeft: (back || close) && !step ? 30 : 10 },
						// { paddingLeft: back || close ? 20 : 10 },
						step && {
							justifyContent: "flex-end",
							flex: 1,
							minWidth: 80,
						},
					]}
				>
					{!(back || close) && (
						<TouchableOpacity onPress={onUserPress}>
							<View
								style={{
									paddingHorizontal: 10,
								}}
							>
								<Icons
									name="user"
									size={25}
									color={colors.white}
								/>
							</View>
						</TouchableOpacity>
					)}
					{!!step && (
						<View style={{}}>
							<Text
								style={{
									textAlign: "right",
									color: colors.white,
									fontWeight: "bold",
								}}
							>
								{strings.step} {step[0]} {strings.of} {step[1]}
							</Text>
						</View>
					)}
				</View>
			</LinearGradient>
		</View>
	);
};
const styles = StyleSheet.create({
	plane: {
		overflow: "hidden",
		backgroundColor: colors.ultraLightDark,
	},
	container: {
		paddingVertical: 15,
		paddingHorizontal: 20,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	titleWrapper: {
		maxWidth: deviceWidth * 0.6,
	},
	title: {
		color: colors.white,
		fontSize: 17,
	},
	iconWrapper: {
		paddingRight: 20,
		paddingVertical: 10,
	},
	menu: {
		height: 14,
		width: 21,
		resizeMode: "contain",
	},
});

const mapStateToProps = (state) => ({ todos: state.todos });

const mapDispatchToProps = {
	toggleMenu,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
