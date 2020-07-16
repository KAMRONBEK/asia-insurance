import React, { useState } from "react";
import { StyleSheet, View, ScrollView, TextInput } from "react-native";
import {
	colors,
	CONTAINER_PADDING,
	deviceWidth,
	BORDER_RADIUS,
	SCREENS,
	Icons,
} from "../../../constants";
import RoundButton from "../../../components/common/RoundButton";
import { strings } from "../../../locales/strings";
import Text from "../../../components/common/Text";
import CustomSwitch from "../../../components/common/CustomSwitch";

const ContactToTechSupport = ({ navigation }) => {
	const onPress = () => {
		navigation.navigate(SCREENS.support);
	};
	let [useLocation, setUseLocation] = useState(false);
	return (
		<ScrollView
			style={{ flex: 1 }}
			contentContainerStyle={styles.container}
		>
			<View style={styles.content}>
				<Text style={styles.title}>{strings.whatHappened}</Text>
				<View style={styles.textArea}>
					<TextInput
						placeholder={strings.enterYourRequest}
						style={styles.input}
					/>
				</View>
				<View style={styles.row}>
					<Text style={styles.bigText}>
						{strings.chooseYourLocationForHelp}
					</Text>
					<CustomSwitch
						value={useLocation}
						onValueChange={setUseLocation}
					/>
				</View>
			</View>
			<View style={styles.buttonWrapper}>
				<RoundButton
					text={strings.sendRequest}
					gradient
					onPress={onPress}
				/>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.ultraLightDark,
		justifyContent: "space-between",
	},
	title: {
		marginTop: 15,
		textAlign: "center",
		fontSize: 16,
		fontWeight: "bold",
	},
	row: {
		flexDirection: "row",
		paddingVertical: 15,
		paddingHorizontal: 20,
		backgroundColor: colors.white,
		marginBottom: 20,
		justifyContent: "space-between",
		alignItems: "center",
	},
	textArea: {
		borderRadius: BORDER_RADIUS,
		padding: 20,
		paddingVertical: 10,
		margin: 20,
		height: 250,
		backgroundColor: colors.white,
	},
	iconWrapper: {
		borderWidth: 0.5,
		borderColor: colors.gray,
		padding: 10,
		paddingRight: 15,
		borderRadius: 10,
	},
	bigText: {
		maxWidth: deviceWidth - 100,
	},
	buttonWrapper: {
		paddingHorizontal: CONTAINER_PADDING * 3,
		paddingBottom: 10,
	},
});

export default ContactToTechSupport;
