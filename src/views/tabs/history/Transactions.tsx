import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	View,
	ScrollView,
	StatusBar,
	RefreshControl,
} from "react-native";
import TransactionCard from "../../../components/card/TransactionCard";
import { colors, CONTAINER_PADDING } from "../../../constants";
import images from "../../../assets/images";
import { strings } from "../../../locales/strings";
import Text from "../../../components/common/Text";
import { requests } from "../../../api/requests";
import { connect } from "react-redux";
import {
	showFlashMessage,
	showLoading,
	hideLoading,
} from "../../../redux/actions";
import { FlatList } from "react-native-gesture-handler";

const Transactions = ({
	navigation,
	user,
	showFlashMessage,
	showLoading,
	hideLoading,
}) => {
	// useEffect(() => {
	// 	StatusBar.setBarStyle("light-content");
	// 	StatusBar.setBackgroundColor(colors.darkBlue);
	// }, [navigation]);

	let [orders, setOrders] = useState([]);

	const boot = async () => {
		try {
			let res = await requests.orderConfirm.myOrders();
			console.log(res.data.data);

			setOrders(res.data.data);
		} catch (error) {
			showFlashMessage({
				type: colors.red,
				message: error,
			});
			console.log(error);
		} finally {
			hideLoading();
		}
	};

	let temp = [
		{
			assignedOperator: null,
			comments: null,
			contactPhone: "936893665",
			deliveryAddress: "НАВОИЙСКИЙ ВИЛОЯТ, УРГУТСКИЙ ТУМАН, ",
			discount: 0,
			extraData:
				",,,,,,Физ.лицо,Ограниченое использование ТС,Без нарушений",
			insuranceSumm: 40000000,
			insuranceType: "ОСГО ВТС",
			orderCreateTime: "19.08.2020 04:11:17",
			orderId: "1106df74-8458-462e-91b8-6a1dcff1d4a5",
			orderNumber: "11179020081916",
			orderPrice: null,
			premia: 44800,
			status: "НОВЫЙ",
		},
	];

	useEffect(() => {
		showLoading(strings.loadingOrders);
		setTimeout(() => {
			boot();
		}, 300);
	}, []);

	let temper = {
		date: "2020-12-22 09:19:32",
		discount: "0",
		id: 72,
		order_id: "b03c1df7-7f9a-4105-865d-3f6ba175f56e",
		order_number: "193120122209",
		price: "56000",
		status: 0,
		type: "osgo",
		user_id: 387,
	};

	let [refreshing, setRefreshing] = useState(false);

	return (
		<View style={styles.container}>
			{/* <Text style={styles.title}>{strings.orderList}</Text> */}

			{orders.length == 0 ? (
				<View style={styles.center}>
					<Text
						style={{
							fontSize: 13,
							color: colors.grayText,
						}}
					>
						{strings.noOrders}
					</Text>
				</View>
			) : (
				<ScrollView
					style={{ flex: 1 }}
					contentContainerStyle={styles.plane}
					showsVerticalScrollIndicator={false}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={boot}
						/>
					}
				>
					<FlatList
						data={orders}
						renderItem={({ item }) => (
							<TransactionCard
								image={
									item.type == "osgo"
										? images.carShield
										: images.planeShield
								}
								title={
									item.type == "osgo"
										? strings.osago
										: strings.vzr
								}
								orderId={item.id}
								assignedOperator={item.assignedOperator + ""}
								price={item.price}
								currency="сум"
								status={
									item.status == 0
										? strings.notPaid
										: strings.paid
								}
								item={item}
							/>
						)}
					/>
				</ScrollView>
			)}

			{/* <TransactionCard
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
				/> */}
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
	center: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = {
	showFlashMessage,
	showLoading,
	hideLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
