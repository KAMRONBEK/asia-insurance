import React from "react";
import { StyleSheet, Text, View, Image, Linking } from "react-native";
import PlainCard from "../../../components/card/PlainCard";
import images from "../../../assets/images";
import {
	colors,
	CONTAINER_PADDING,
	deviceWidth,
	SCREENS,
} from "../../../constants";
import { strings } from "../../../locales/strings";

const Support = ({ navigation }) => {
	const onWritePress = () => {
		navigation.navigate(SCREENS.contactToTechSupport);
	};
	const onCallPress = () => Linking.openURL(`tel:${"+998712331111"}`);
	return (
		<View style={styles.container}>
			<View style={styles.cardWrapper}>
				<PlainCard
					onPress={onWritePress}
					icon="edit"
					title={strings.write}
					content={strings.writeToTechSupport}
				/>
				<PlainCard
					onPress={onCallPress}
					icon="phone"
					title={strings.call}
					content={strings.callToCallCenter}
				/>
			</View>
			<Image source={images.ladyWorking} style={styles.image} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.ultraLightDark,
		flex: 1,
		justifyContent: "space-between",
	},

	cardWrapper: {
		paddingHorizontal: 1.5 * CONTAINER_PADDING,
		paddingTop: 50,
	},
	image: {
		width: deviceWidth,
		height: 350,
		resizeMode: "contain",
		marginBottom: -110,
	},
});

export default Support;
