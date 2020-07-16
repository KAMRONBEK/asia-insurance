import React, { useState } from "react";
import { StyleSheet, View, TextInput, ScrollView } from "react-native";
import {
	colors,
	Icons,
	BORDER_RADIUS,
	deviceWidth,
	CONTAINER_PADDING,
	SCREENS,
} from "../../../constants";
import { strings } from "../../../locales/strings";
import Text from "../../../components/common/Text";
import RoundButton from "../../../components/common/RoundButton";
import CustomSwitch from "../../../components/common/CustomSwitch";

const HelpRequest = ({ navigation }) => {
	const onPress = () => {
		navigation.navigate(SCREENS.sos);
	};
	let [useLocation, setUseLocation] = useState(false);
	return (
		<ScrollView
			style={{ flex: 1, backgroundColor: colors.ultraLightDark }}
			contentContainerStyle={styles.container}
			showsVerticalScrollIndicator={false}
		>
			<Text style={styles.title}>{strings.whatHappenedTellUs}</Text>
			<View style={styles.textArea}>
				<TextInput
					multiline={true}
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
			<View style={styles.row}>
				<Text style={styles.bigText}>
					{strings.selectLocationManually}
				</Text>
				<View style={styles.iconWrapper}>
					<Icons name="flag" size={25} color={colors.darkBlue} />
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

export default HelpRequest;

const styles = StyleSheet.create({
	container: {},
	title: {
		marginTop: 30,
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
	input: {
		width: deviceWidth * 0.67,
		height: 240,
		textAlignVertical: "top",
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
		paddingBottom: 20,
	},
});
