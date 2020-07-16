import React, { useEffect } from "react";
import { StyleSheet, View, ScrollView, StatusBar } from "react-native";
import TransactionCard from "../../../components/card/TransactionCard";
import { colors, CONTAINER_PADDING } from "../../../constants";
import images from "../../../assets/images";
import { strings } from "../../../locales/strings";
import Text from "../../../components/common/Text";

const Transactions = ({ navigation }) => {
	useEffect(() => {
		StatusBar.setBarStyle("light-content");
		StatusBar.setBackgroundColor(colors.darkBlue);
	}, [navigation]);

	return (
		<View style={styles.container}>
			<ScrollView
				style={{ flex: 1 }}
				contentContainerStyle={styles.plane}
				showsVerticalScrollIndicator={false}
			>
				<Text style={styles.title}>{strings.transactionsList}</Text>
				<TransactionCard
					image={images.carShield}
					title={strings.osago}
					orderId="4364644554"
					transactionId="4364644554"
					status="В обработке"
					currency="сум"
					price="200 000"
				/>
				<TransactionCard
					image={images.carShield}
					title={strings.osago}
					orderId="4364644554"
					transactionId="4364644554"
					status="В обработке"
					currency="сум"
					price="200 000"
				/>
				<TransactionCard
					image={images.carShield}
					title={strings.osago}
					orderId="4364644554"
					transactionId="4364644554"
					status="Оплачено"
					currency="сум"
					price="200 000"
				/>
				<TransactionCard
					image={images.carShield}
					title={strings.osago}
					orderId="4364644554"
					transactionId="4364644554"
					status="Оплачено"
					currency="сум"
					price="200 000"
				/>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.ultraLightDark,
	},
	plane: {
		padding: CONTAINER_PADDING,
	},
	title: {
		fontWeight: "bold",
		fontSize: 15,
		paddingBottom: 30,
	},
});

export default Transactions;
