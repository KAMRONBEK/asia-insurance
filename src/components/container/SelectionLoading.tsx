import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { colors } from "../../constants";
import LottieView from "lottie-react-native";
import lotties from "../../assets/lotties";

const SelectionLoading = ({ selectionLoading }) => {
	if (!selectionLoading) {
		return null;
	}

	return (
		<View style={styles.container}>
			<LottieView
				source={lotties.selectionLoading}
				// resizeMode="cover"
				style={{
					height: 200,
					width: 200,
					padding: 0,
					marginBottom: 40,
				}}
				autoPlay
				loop
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		top: 270,
		bottom: 0,
		right: 0,
		left: 0,
		position: "absolute",
		backgroundColor: colors.ultraLightDark,
		justifyContent: "center",
		alignItems: "center",
	},
});

const mapStateToProps = ({ appState }) => ({
	selectionLoading: appState.selectionLoading,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SelectionLoading);
