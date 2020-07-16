import React from "react";
import {
	StyleSheet,
	View,
	GestureResponderEvent,
	TouchableWithoutFeedback,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { Icons, colors, BORDER_RADIUS } from "../../constants";
import Text from "../common/Text";
import Touchable from "../common/Touchable";

interface PlainCardProps {
	icon: string;
	title: string;
	content: string;
	onPress?: any;
}

const PlainCard = ({ icon, title, content, onPress }: PlainCardProps) => {
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View style={styles.container}>
				<Icons name={icon} size={20} color={colors.gray} />
				<View style={styles.wrapper}>
					<Text numberOfLines={1} style={styles.title}>
						{title}
					</Text>
					<Text numberOfLines={1} style={styles.content}>
						{content}
					</Text>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white,
		borderRadius: BORDER_RADIUS,
		flexDirection: "row",
		marginBottom: 10,
		padding: 15,
		alignItems: "center",
		paddingHorizontal: 20,
	},
	wrapper: {
		paddingHorizontal: 15,
	},
	title: {
		color: colors.darkBlue,
		fontSize: 14,
		fontWeight: "bold",
	},
	content: {
		fontSize: 14,
		fontWeight: "300",
	},
});

export default PlainCard;
