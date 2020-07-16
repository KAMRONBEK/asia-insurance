import React from "react";
import { StyleSheet, View } from "react-native";
import { strings } from "../../locales/strings";
import { BORDER_RADIUS, colors, CONTAINER_PADDING } from "../../constants";
import Text from "../common/Text";

interface PayoutCardProps {
	policyNumber: string;
	status: string;
	orderId: string;
	date: string;
}

const PayoutCard = ({
	policyNumber,
	status,
	orderId,
	date,
}: PayoutCardProps) => {
	return (
		<View style={styles.container}>
			<View style={styles.column}>
				<Text style={styles.text}>{strings.policyNumber}</Text>
				<Text style={styles.bold}>{policyNumber}</Text>
				<View style={styles.paddingVertical} />
				<Text style={styles.text}>{strings.orderId}</Text>
				<Text style={styles.bold}>{orderId}</Text>
			</View>
			<View style={styles.column}>
				<Text style={styles.text}>{strings.status}</Text>
				<Text
					style={[
						styles.bold,
						status === "Одобрено" && {
							color: colors.green,
						},
					]}
				>
					{status}
				</Text>
				<View style={styles.paddingVertical} />
				<Text style={styles.text}>{strings.date}</Text>
				<Text style={styles.bold}>{date}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: BORDER_RADIUS,
		backgroundColor: colors.white,
		paddingHorizontal: CONTAINER_PADDING,
		paddingVertical: 20,
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 20,
	},
	paddingVertical: {
		paddingVertical: 10,
	},
	text: {
		fontSize: 13,
	},
	column: {},
	bold: {
		fontWeight: "bold",
	},
});

export default PayoutCard;
