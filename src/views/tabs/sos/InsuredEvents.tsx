import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { requests } from "../../../api/requests";
import { colors } from "../../../constants";
import { init } from "../../../utils/NotificationServices";

const InsuredEvents = () => {
	let [events, setEvents] = useState([]);

	const init = async () => {
		try {
			let response = await requests.insuredCases.myRequest();
			console.log(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		init();
	}, []);

	return (
		<View style={styles.container}>
			{events.length == 0 ? (
				<Text style={styles.grayText}>скоро доступно</Text>
			) : (
				<ScrollView></ScrollView>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.ultraLightDark,
	},
	grayText: {
		color: colors.grayText,
		fontSize: 13,
	},
});

export default InsuredEvents;
