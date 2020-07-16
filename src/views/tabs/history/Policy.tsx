import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, CONTAINER_PADDING } from "../../../constants";
import { strings } from "../../../locales/strings";
import PolicyCard from "../../../components/card/PolicyCard";
import images from "../../../assets/images";

const Policy = ({ navigation }) => {
	return (
		<View style={styles.container}>
			{/* <View style={styles.row}>
				<Text style={styles.title}>{strings.insuranceCases}</Text>
				<View style={styles.iconWrapper}>
					<Text style={styles.icon}>1</Text>
				</View>
			</View> */}
			<View style={styles.row}>
				<Text style={styles.title}>{strings.availablePolicies}</Text>
			</View>
			<PolicyCard
				image={images.carShield}
				id="4364644972"
				title={strings.osago}
				date="08 мая 2021"
			/>
			<PolicyCard
				image={images.planeShield}
				id="4364644972"
				title={strings.vzr}
				date="08 мая 2021"
			/>
			<PolicyCard
				image={images.planeShield}
				id="4364644972"
				title={strings.vzr}
			/>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.ultraLightDark,
		paddingHorizontal: CONTAINER_PADDING,
	},
	row: {
		paddingVertical: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	title: {
		fontSize: 15,
		fontWeight: "bold",
	},
	iconWrapper: {
		height: 25,
		width: 25,
		backgroundColor: colors.red,
		borderRadius: 40,
		justifyContent: "center",
		alignItems: "center",
	},
	icon: {
		fontSize: 15,
		color: colors.white,
		fontWeight: "bold",
	},
});

export default Policy;
