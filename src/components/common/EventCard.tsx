import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { color } from "react-native-reanimated";
import { colors, SCREENS } from "../../constants";
import { strings } from "../../locales/strings";

const EventCard = ({ item, navigation }) => {
	console.log(item);
	let temp = {
		address: "Лисунова 1",
		claimCompensation: [],
		claimOsago: [],
		date: "2020-11-17 12:42:54",
		fileDtp: [],
		fileMedicine: [],
		id: 9,
		lat: "333",
		lng: "222",
		status: 0,
	};
	return (
		<TouchableOpacity
			onPress={() => {
				navigation.navigate(SCREENS.insuredEventPage);
			}}
		>
			<View style={styles.contianer}>
				<View style={styles.statusWrapper}>
					<Text style={styles.text}> {strings.status}</Text>
					<Text
						style={[
							styles.boldText,
							{
								color: item.status ? colors.green : colors.red,
							},
						]}
					>
						{item.status ? strings.approved : strings.inProgress}
					</Text>
				</View>
				<View style={styles.row}>
					<View style={styles.column}>
						<Text
							style={[
								styles.text,
								{
									paddingBottom: 10,
								},
							]}
						>
							{strings.address}
						</Text>
						<Text style={styles.boldText}>{item.address}</Text>
					</View>
					<View style={styles.column}>
						<Text
							style={[
								styles.text,
								{
									paddingBottom: 10,
								},
							]}
						>
							{strings.date}
						</Text>
						<Text style={styles.boldText}>
							{item.date.split(" ")[0]}
						</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	contianer: {
		backgroundColor: colors.white,
		borderRadius: 10,
		paddingVertical: 7,
		paddingHorizontal: 12,
	},
	statusWrapper: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	text: {
		fontSize: 14,
	},
	boldText: {
		fontSize: 14,
		fontWeight: "bold",
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	column: {},
});

export default EventCard;
