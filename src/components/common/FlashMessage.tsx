import React, { useState, useEffect } from "react";
import { View, Animated, StyleSheet, StatusBar, Image } from "react-native";
import { connect } from "react-redux";
import { colors, BORDER_RADIUS, BIG_BORDER_RADIUS } from "../../constants";
import { AppState } from "../../redux/types";
import Text from "./Text";
import images from "../../assets/images";

const FlashMessage = ({ flashMessage, flashMessageType }) => {
	const [translateY, setAnimation] = useState(new Animated.Value(-200));
	useEffect(() => {
		if (flashMessage) {
			Animated.timing(translateY, {
				toValue: 0,
				useNativeDriver: true,
			}).start();
			// StatusBar.setBarStyle("light-content");
			// StatusBar.setBackgroundColor(flashMessageType);
			setTimeout(() => {
				Animated.timing(translateY, {
					toValue: -200,
					useNativeDriver: true,
				}).start();

				// StatusBar.setBarStyle("light-content");
				// StatusBar.setBackgroundColor(colors.darkBlue);
			}, 3000);
		}
	}, [flashMessage]);
	return (
		<Animated.View
			style={[
				styles.container,
				{
					transform: [{ translateY }],
					backgroundColor: flashMessageType,
				},
			]}
		>
			<Text numberOfLines={3} style={styles.text}>
				{flashMessage}
			</Text>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 10,
		margin: 50,
		marginVertical: 10,
		marginTop: 50,
		position: "absolute",
		backgroundColor: "red",
		justifyContent: "center",
		alignItems: "center",
		top: 0,
		left: 0,
		right: 0,
		// borderBottomLeftRadius: BIG_BORDER_RADIUS,
		// borderBottomRightRadius: BIG_BORDER_RADIUS,
		borderRadius: BORDER_RADIUS,
		opacity: 0.95,
	},
	text: {
		color: colors.white,
		fontWeight: "500",
	},
});

const mapStateToProps = ({ appState: { flashMessage, flashMessageType } }) => ({
	flashMessage,
	flashMessageType,
});

const mapDispatchToProps = {};

export default connect<AppState>(mapStateToProps)(FlashMessage);
