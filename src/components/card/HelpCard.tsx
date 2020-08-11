import React from "react";
import { StyleSheet, Text, View, GestureResponderEvent } from "react-native";
import {
	colors,
	BORDER_RADIUS,
	CONTAINER_PADDING,
	Icons,
	deviceWidth,
} from "../../constants";
import RoundButton from "../common/RoundButton";
import { strings } from "../../locales/strings";
import { TextInput } from "react-native-gesture-handler";

interface HelpCardProps {
	id: number;
	onPress?: ((event: GestureResponderEvent) => void) | undefined;
	title: string;
	content: string;
	status: string;
	time: string;
	date: string;
	buttonText: string;
	helperId?: string;
	number: string;
}

const HelpCard = ({
	id,
	onPress,
	title,
	content,
	status,
	time,
	date,
	buttonText,
	helperId,
	number,
}: HelpCardProps) => {
	return (
		<View style={styles.container}>
			<View style={styles.titleWrapper}>
				<Text style={[styles.bold, { width: deviceWidth * 0.5 }]}>
					{title}
				</Text>
				<Text
					style={[
						styles.status,
						status == "0" && {
							color: colors.red,
						},
						status == "1" && {
							color: colors.green,
						},
					]}
				>
					{status == "0" ? strings.waitingHelp : strings.helped}
				</Text>
			</View>
			<Text style={styles.content}>{content}</Text>
			<Text style={styles.date}>
				{/* {time},  */}
				{date}
			</Text>
			{status == "1" && (
				<View style={styles.buttonWrapper}>
					<View style={styles.iconWrapper}>
						{!helperId ? (
							<Icons
								name="flag"
								size={25}
								color={colors.darkBlue}
							/>
						) : (
							<TextInput
								style={{
									fontSize: 16,
									color: colors.darkBlue,
									padding: 0,
								}}
								placeholder="ID"
								keyboardType="decimal-pad"
							></TextInput>
						)}
					</View>
					<RoundButton
						onPress={onPress || undefined}
						text={buttonText}
						radius={10}
						number={number}
						backgroundColor={colors.darkBlue}
					/>
				</View>
			)}
			{!!helperId && (
				<Text style={styles.bold}>
					{strings.helped} ID {helperId}
				</Text>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: BORDER_RADIUS,
		backgroundColor: colors.white,
		paddingHorizontal: CONTAINER_PADDING,
		paddingVertical: 20,
		marginBottom: 15,
	},
	titleWrapper: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	bold: {
		fontSize: 16,
		fontWeight: "bold",
	},
	status: {
		fontSize: 16,
	},
	date: {
		fontSize: 13,
		textAlign: "right",
	},
	content: {
		paddingTop: 5,
		fontSize: 13,
		lineHeight: 25,
	},
	buttonWrapper: {
		paddingTop: 30,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	iconWrapper: {
		borderWidth: 0.5,
		borderColor: colors.gray,
		padding: 13,
		paddingHorizontal: 20,
		marginBottom: 20,
		borderRadius: 10,
		marginRight: 20,
	},
});

export default HelpCard;
