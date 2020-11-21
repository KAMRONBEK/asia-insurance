import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { requests } from "../../../api/requests";
import PlainCard from "../../../components/card/PlainCard";
import EventCard from "../../../components/common/EventCard";
import { colors, CONTAINER_PADDING, Icons } from "../../../constants";
import { init } from "../../../utils/NotificationServices";

const InsuredEvents = ({ navigation }) => {
	let [events, setEvents] = useState([]);

	const init = async () => {
		try {
			let response = await requests.insuredCases.myRequest();
			console.log(response.data.data);
			setEvents(response.data.data);
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
				// <View style={styles.content}>
				<FlatList
					data={events}
					renderItem={({ item, index }) => (
						<EventCard
							item={item}
							key={(item + index).toString()}
							navigation={navigation}
						/>
					)}
				/>
				// </View>
			)}
			<View style={styles.buttonWrapper}>
				<TouchableOpacity onPress={() => {}}>
					<View style={styles.round}>
						<Icons
							name="card-hand"
							color={colors.white}
							size={25}
						/>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// justifyContent: "center",
		// alignItems: "center",
		backgroundColor: colors.ultraLightDark,
		padding: CONTAINER_PADDING,
	},
	grayText: {
		color: colors.grayText,
		fontSize: 13,
	},
	buttonWrapper: {
		bottom: 20,
		position: "absolute",
		right: 20,
	},
	round: {
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 60,
		width: 60,
		height: 60,
		backgroundColor: colors.red,
	},
});

export default InsuredEvents;
