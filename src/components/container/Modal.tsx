import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableWithoutFeedback,
	Animated,
} from "react-native";
import { connect } from "react-redux";
import { hideModal } from "../../redux/actions";
import { strings } from "../../locales/strings";
import { colors } from "../../constants";

const Modal = ({ children, hideModal, modalVisibility }) => {
	let [colorAnimation, setAnimation] = useState(new Animated.Value(0));

	let colorInterpolation = colorAnimation.interpolate({
		inputRange: [0, 1],
		outputRange: ["transparent", "rgba(0,0,0,0.2)"],
	});

	useEffect(() => {
		if (modalVisibility) {
			Animated.parallel([
				Animated.timing(colorAnimation, {
					toValue: 1,
					duration: 500,
					useNativeDriver: false,
				}),
			]).start();
		} else {
			Animated.parallel([
				Animated.timing(colorAnimation, {
					toValue: 0,
					duration: 500,
					useNativeDriver: false,
				}),
			]).start();
		}
	}, []);

	if (!modalVisibility) {
		return null;
	}
	return (
		<TouchableWithoutFeedback
			onPress={() => {
				hideModal();
			}}
		>
			<Animated.View
				style={[
					styles.container,
					{
						backgroundColor: colorInterpolation,
					},
				]}
			>
				{children}
			</Animated.View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		justifyContent: "center",
		alignItems: "center",
	},
});

const mapStateToProps = ({ appState }) => ({
	modalVisibility: appState.modalVisibility,
});

const mapDispatchToProps = {
	hideModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
