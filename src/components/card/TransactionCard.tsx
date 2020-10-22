import React from "react";
import { StyleSheet, View, ImageSourcePropType, Image } from "react-native";
import {
	colors,
	BORDER_RADIUS,
	Icons,
	CONTAINER_PADDING,
} from "../../constants";
import { strings } from "../../locales/strings";
import Text from "../common/Text";

interface TransactionCardProps {
	image: ImageSourcePropType;
	status: string;
	title: string;
	orderId: string;
	price: string;
	transactionId: string;
	currency: string;
	assignedOperator: any;
}

const TransactionCard = ({
	image,
	status,
	title,
	orderId,
	price,
	transactionId,
	currency,
	assignedOperator,
}: TransactionCardProps) => {
	return (
		<View style={styles.container}>
			<View
				style={[
					styles.row,
					{
						paddingBottom: 10,
					},
				]}
			>
				<Text style={styles.status}>{strings.status}</Text>
				<View style={styles.statusWrapper}>
					{status !== "НОВЫЙ" ? (
						<View style={styles.iconWrapper}>
							<Icons
								name="check1"
								color={colors.white}
								size={16}
							/>
						</View>
					) : (
						<Icons name="loading" color={colors.red} size={20} />
					)}
					<Text
						style={[
							styles.bold,
							{
								color:
									status !== "НОВЫЙ"
										? colors.green
										: colors.red,
								paddingLeft: 10,
							},
						]}
					>
						{status}
					</Text>
				</View>
			</View>
			<View style={styles.row}>
				<View style={styles.column}>
					<View style={styles.row}>
						<Image source={image} style={styles.image} />
						<View
							style={{
								paddingLeft: 5,
							}}
						>
							<Text style={styles.text}>{strings.policy}</Text>
							<Text style={styles.title}>{title}</Text>
						</View>
					</View>
					<Text style={styles.text}>{strings.summ}</Text>
					<Text style={styles.bold}>
						{price} <Text style={styles.currency}>{currency}</Text>
					</Text>
				</View>
				<View style={styles.column}>
					<View
						style={{
							paddingBottom: 20,
						}}
					>
						<Text style={styles.text}>{strings.orderId}</Text>
						<Text style={styles.bold}>{orderId}</Text>
					</View>
					<Text style={styles.text}>{strings.transactionsId}</Text>
					<Text style={styles.bold}>{assignedOperator}</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white,
		borderRadius: BORDER_RADIUS,
		marginBottom: 20,
		paddingHorizontal: CONTAINER_PADDING,
		paddingVertical: 20,
	},
	iconWrapper: {
		backgroundColor: colors.green,
		height: 22,
		width: 22,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 50,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	statusWrapper: {
		flexDirection: "row",
		alignItems: "center",
	},
	image: {
		height: 55,
		width: 55,
		resizeMode: "contain",
		marginLeft: -5,
	},
	column: {
		paddingHorizontal: 10,
		justifyContent: "space-between",
	},
	status: {
		fontSize: 14,
	},
	bold: {
		fontSize: 14,
		fontWeight: "bold",
	},
	text: {
		fontSize: 13,
	},
	currency: {
		fontWeight: "300",
	},
	title: {
		fontSize: 16,
		fontWeight: "bold",
	},
});

export default TransactionCard;
