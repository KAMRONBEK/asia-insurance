import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import LottieView from "lottie-react-native";
import lotties from "../../assets/lotties";
import { colors } from "../../constants";
import Text from "../common/Text";

const Loading = ({ loading, loadingMessage }) => {
	if (!loading) {
		return null;
	}

	return (
		<View style={styles.container}>
			<LottieView
				source={lotties.downLoading}
				// resizeMode="cover"
				style={{
					height: 100,
					width: 100,
					padding: 0,
					marginBottom: 15,
				}}
				autoPlay
				loop
			/>
			<Text style={styles.text}>{loadingMessage}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		position: "absolute",
		backgroundColor: colors.ultraLightDark,
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		textAlign: "center",
		fontSize: 16,
		fontWeight: "400",
		color: colors.darkBlueText,
	},
});

const mapStateToProps = ({ appState }) => ({
	loading: appState.loading,
	loadingMessage: appState.loadingMessage,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
