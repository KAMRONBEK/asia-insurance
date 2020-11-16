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
import { colors, deviceWidth } from "../../constants";

const Modal = ({ children, hideModal, modalVisibility, modalChild }) => {
	let [colorAnimation, setAnimation] = useState(new Animated.Value(0));

	let colorInterpolation = colorAnimation.interpolate({
		inputRange: [0, 1],
		outputRange: ["transparent", "rgba(255,255,255,0.9)"],
	});

	useEffect(() => {
		if (modalVisibility) {
			Animated.parallel([
				Animated.timing(colorAnimation, {
					toValue: 1,
					duration: 200,
					useNativeDriver: false,
				}),
			]).start();
		} else {
			Animated.parallel([
				Animated.timing(colorAnimation, {
					toValue: 0,
					duration: 200,
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
						backgroundColor: colors.white,
					},
				]}
			>
				{modalChild &&
					modalChild.map((service, index) => {
						return (
							<View style={styles.row}>
								<View
									style={{
										maxWidth: 0.6 * deviceWidth,
									}}
								>
									<Text>{service.serviceName}</Text>
								</View>
								<Text>{service.serviceCost}</Text>
							</View>
						);
					})}
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
		backgroundColor: colors.white,
		padding: 15,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderColor: colors.lightBlue,
		borderRadius: 5,
		flex: 1,
		width: deviceWidth - 20,
		paddingHorizontal: 20,
		margin: 5,
		backgroundColor: colors.ultraLightBlue,
	},
});

const mapStateToProps = ({ appState }) => ({
	modalVisibility: appState.modalVisibility,
	modalChild: appState.modalChild,
});

const mapDispatchToProps = {
	hideModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
