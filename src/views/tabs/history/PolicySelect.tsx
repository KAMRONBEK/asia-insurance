import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { strings } from "../../../locales/strings";
import PolicyCard from "../../../components/card/PolicyCard";
import images from "../../../assets/images";
import { CONTAINER_PADDING, colors } from "../../../constants";

const PolicySelect = ({ navigation }) => {
	let [radio, setRadio] = useState({ osago: true, vzr: false });
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{strings.policySelectionInfo}</Text>
			<PolicyCard
				image={images.carShield}
				id="4364644972"
				title={strings.osago}
				date="08 мая 2021"
				radio={true}
				onValueChange={setRadio}
				radioValue={radio}
				check={radio.osago}
			/>
			<PolicyCard
				image={images.planeShield}
				id="4364644972"
				title={strings.vzr}
				date="08 мая 2021"
				radio={true}
				onValueChange={setRadio}
				radioValue={radio}
				check={radio.vzr}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: CONTAINER_PADDING,
		backgroundColor: colors.ultraLightDark,
		flex: 1,
	},
	title: {
		fontSize: 16,
		fontWeight: "bold",
		paddingBottom: 20,
	},
});

export default PolicySelect;
