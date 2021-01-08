import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";
import {
	colors,
	deviceWidth,
	CONTAINER_PADDING,
	SCREENS,
	deviceHeight,
} from "../../../constants";
import LottieView from "lottie-react-native";
import images from "../../../assets/images";
import lotties from "../../../assets/lotties";
import { strings } from "../../../locales/strings";
import Text from "../../../components/common/Text";
import RoundButton from "../../../components/common/RoundButton";
import { connect } from "react-redux";
import { isEmpty, extractTariffs } from "../../../utils/functions";
import {
	hideLoading,
	setInsuranceCost,
	showFlashMessage,
	showLoading,
	setAntiCovid,
} from "../../../redux/actions";
import { requests } from "../../../api/requests";
import { navigate } from "../../../utils/NavigationService";
import moment from "moment";
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomSwitch from "../../../components/common/CustomSwitch";

const Cost = ({
	navigation,
	route,
	osago,
	vzr,
	setInsuranceCost,
	user,
	showLoading,
	hideLoading,
	showFlashMessage,
	setAntiCovid,
}) => {
	let [loading, setLoading] = useState(true);
	let { insuranceType } = route.params;

	//osago
	let [cost, setCost] = useState(1);
	let [costDiscounted, setCostDiscounted] = useState(0);

	let tariffList;
	let osagoTariff;
	if (insuranceType == strings.osago) {
		tariffList = extractTariffs(osago, "osago");
		osagoTariff =
			tariffList.reduce((prev, current) => {
				// console.warn(prev, current);
				console.log(current);

				return prev * Number.parseFloat(current.tariff);
			}, 1) / osago.privilege.availablePrivilege.tariff;
	}

	//vzr
	let [vzrCost, setVzrCost] = useState();

	const calculateVzr = async () => {
		try {
			console.log("cost");

			let currency = await requests.travel.getCurrency();
			console.log({
				PeriodType:
					vzr?.tripPurpose?.isMulti?.id ==
					"48a977e0-c657-4cdb-b0bf-1b9342bfbaa8"
						? 0
						: 1,
				MultiPeriodId: vzr?.tripPurpose?.selectedPeriod?.id.split(
					";"
				)[1],
				CurrencyValue: currency.data.currency_value,
				DaysCount:
					moment(vzr.tripDuration.endDate, "DD.MM.YYYY").diff(
						moment(vzr.tripDuration.startDate, "DD.MM.YYYY"),
						"days"
					) + 1,
				InsuranceProgramId:
					vzr?.destinationCountry?.program?.insuranceProgramId,
				InsuranceGoalId: vzr?.tripPurpose?.purpose?.id,
				AntiCovidCoverage: vzr?.antiCovid ? 1 : 0,
				PersonsBirthDates: [
					vzr?.insuredPerson?.insuredPerson?.birthDate,
				],
				GroupTypeId: vzr?.tripPurpose?.peopleCount?.id.split(";")[1],
			});

			let response = await requests.travel.calculate({
				PeriodType:
					vzr?.tripPurpose?.isMulti?.id ==
					"48a977e0-c657-4cdb-b0bf-1b9342bfbaa8"
						? 0
						: 1,
				MultiPeriodId: vzr?.tripPurpose?.selectedPeriod?.id.split(
					";"
				)[1],
				CurrencyValue: currency.data.currency_value,
				DaysCount:
					moment(vzr.tripDuration.endDate, "DD.MM.YYYY").diff(
						moment(vzr.tripDuration.startDate, "DD.MM.YYYY"),
						"days"
					) + 1,
				InsuranceProgramId:
					vzr?.destinationCountry?.program?.insuranceProgramId,
				InsuranceGoalId: vzr?.tripPurpose?.purpose?.id,
				AntiCovidCoverage: vzr?.antiCovid ? 1 : 0,
				PersonsBirthDates: [
					vzr?.insuredPerson?.insuredPerson?.birthDate,
				],
				GroupTypeId: vzr?.tripPurpose?.peopleCount?.id.split(";")[1],
			});
			console.log(response.data.data, "cost");

			setVzrCost(response.data.data);
		} catch (error) {
			console.log(error.response.data);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (insuranceType == strings.osago) {
			setCost((osagoTariff * 40000000) / 100);
			setCostDiscounted(
				(osagoTariff *
					40000000 *
					osago.privilege.availablePrivilege.tariff) /
					100
			);
			setInsuranceCost(
				(osagoTariff *
					40000000 *
					osago.privilege.availablePrivilege.tariff) /
					100
			);
		}
		if (insuranceType == strings.vzr) {
			setLoading(true);
			// console.log({
			// 	PeriodType:
			// 		vzr?.tripPurpose?.isMulti?.id ==
			// 		"48a977e0-c657-4cdb-b0bf-1b9342bfbaa8"
			// 			? 0
			// 			: 1,
			// 	MultiPeriodId: vzr?.tripPurpose?.selectedPeriod?.id.split(
			// 		";"
			// 	)[1],
			// 	CurrencyValue: 10000,
			// 	DaysCount: moment(vzr.tripDuration.endDate, "DD.MM.YYYY").diff(
			// 		moment(vzr.tripDuration.startDate, "DD.MM.YYYY"),
			// 		"days"
			// 	),
			// 	InsuranceProgramId:
			// 		vzr?.destinationCountry?.program?.insuranceProgramId,
			// 	InsuranceGoalId: vzr?.tripPurpose?.purpose?.id,
			// 	AntiCovidCoverage: 0,
			// 	PersonsBirthDates: [
			// 		vzr?.insuredPerson?.insuredPerson?.birthDate,
			// 	],
			// 	GroupTypeId: vzr?.tripPurpose?.peopleCount?.id.split(";")[1],
			// });

			calculateVzr();
		}

		setTimeout(() => {
			setLoading(false);
		}, 500);
	}, []);

	useEffect(() => {
		calculateVzr();
	}, [vzr.antiCovid]);

	let { destinationCountry, tripDuration, tripPurpose, insuredPerson } = vzr;

	// {"countries": [{"id": 184, "level": 1, "name": "УЗБЕКИСТАН", "selected": true, "text": "УЗБЕКИСТАН"}, {"id": 187, "level": 3, "name": "ЧИЛИ", "selected": true, "text": "ЧИЛИ"}], "program": {"currencyCode": "EUR", "insuranceProgramId": "fa5589ab-ad68-46e8-a31c-13ff195928ee", "insuranceProgramName": "ABSOLUT", "insuranceSummValue": 80000, "level": 3}} destinationCountry
	// {"endDate": "Invalid date", "startDate": "Invalid date"} tripDuration
	// {"isMulti": {"id": "48a977e0-c657-4cdb-b0bf-1b9342bfbaa8", "name": "ОДНОКРАТНОЕ ПУТЕШЕСТВИЕ"}, "multiPeriods": undefined, "peopleCount": {"id": "2,50;5f44f84f-bb20-447f-8616-74bd68c6daab", "name": "СЕМЬЯ (ОТ 3 ДО 6 ЧЕЛОВЕК)"}, "purpose": {"id": "1e4e1009-6296-4866-8c6b-03191da79d59", "name": "СПОРТ"}, "selectedPeriod": undefined} tripPurpose
	// {"insuredPerson": {"country": {"id": 184, "text": "УЗБЕКИСТАН"}, "lastName": "Kfkfkd", "midName": "Bshsjsd", "name": "Hsjsjss", "region": {"id": 10, "text": "ГОРОД  ТАШКЕНТ"}}} insuredPerson
	// {"countries": [{"id": 184, "level": 1, "name": "УЗБЕКИСТАН", "selected": true, "text": "УЗБЕКИСТАН"}, {"id": 187, "level": 3, "name": "ЧИЛИ", "selected": true, "text": "ЧИЛИ"}], "program": {"currencyCode": "EUR", "insuranceProgramId": "fa5589ab-ad68-46e8-a31c-13ff195928ee", "insuranceProgramName": "ABSOLUT", "insuranceSummValue": 80000, "level": 3}} destinationCountry
	// {"endDate": "Invalid date", "startDate": "Invalid date"} tripDuration
	// {"isMulti": {"id": "48a977e0-c657-4cdb-b0bf-1b9342bfbaa8", "name": "ОДНОКРАТНОЕ ПУТЕШЕСТВИЕ"}, "multiPeriods": undefined, "peopleCount": {"id": "2,50;5f44f84f-bb20-447f-8616-74bd68c6daab", "name": "СЕМЬЯ (ОТ 3 ДО 6 ЧЕЛОВЕК)"}, "purpose": {"id": "1e4e1009-6296-4866-8c6b-03191da79d59", "name": "СПОРТ"}, "selectedPeriod": undefined} tripPurpose

	let createOrder = async () => {
		console.log(user);

		try {
			let res = await requests.order.createOrder({
				CustomerId: user.customerId,
				ContactPhone: user.user.phone,
				InsuranceType: 1, //vzr
				DeliveryOblastId: 10,
				DeliveryRayonId: 1003,
				InsuranceParams: {
					Premia: vzrCost,
					InsuranceSumm:
						vzr.destinationCountry?.program?.insuranceSummValue,
					Discount: 0,
					BeginDate: vzr.tripDuration.startDate,
					EndDate: vzr.tripDuration.endDate,
					ExtraData: JSON.stringify(vzr),
				},
				// Docs: checkout.documents,
				Docs: [],
				// DocsInBytes: checkout.documents,
			});
			console.log({
				CustomerId: user.customerId,
				ContactPhone: user.user.phone,
				InsuranceType: 1, //vzr
				DeliveryOblastId: 10,
				DeliveryRayonId: 1003,
				InsuranceParams: {
					Premia: vzrCost,
					InsuranceSumm:
						vzr.destinationCountry?.program?.insuranceSummValue,
					Discount: 0,
					BeginDate: vzr.tripDuration.startDate,
					EndDate: vzr.tripDuration.endDate,
					ExtraData: JSON.stringify(vzr),
				},
				Docs: [],
			});

			console.log(res.data);

			let orderConfirmRespose = await requests.orderConfirm.confirmOrder({
				type: "vzr",
				order_number: res.data.orderNumber,
				order_id: res.data.orderId,
				price: Math.ceil(vzrCost / 100) * 100,
				discount: 0,
			});

			console.log(orderConfirmRespose.data.data);

			showFlashMessage({
				type: colors.green,
				message:
					strings.yourOrderAccepted +
					"\n" +
					strings.orderId +
					res.data.orderId,
			});
			// navigation.navigate(SCREENS.products);
			navigate(SCREENS.tabs, {
				name: SCREENS.historyStack,
				params: {
					screen: SCREENS.payments,
					params: {
						paymentData: orderConfirmRespose.data.data,
					},
				},
			});
		} catch (error) {
			console.log(error.response.data, "error in create order VZR");
		} finally {
			hideLoading();
		}
	};

	const onButtonPress = () => {
		if (insuranceType == strings.osago) {
			navigation.navigate(SCREENS.checkout);
		} else {
			console.log("vzr");
			showLoading(strings.registeringYourOrder);
			createOrder();
		}
	};

	const LoadingCost = () => {
		return (
			<View style={styles.loadingWrapper}>
				<LottieView
					source={lotties.loading}
					// resizeMode="cover"
					style={{
						height: 300,
						width: 300,
						padding: 0,
						marginBottom: -160,
						marginTop: -30,
					}}
					autoPlay
					loop
				/>
				<Text style={styles.loadingTitle}>
					{strings.calculatingCost}
				</Text>
				<Text style={styles.loadingText}>
					{strings.loadingCostInfo}
				</Text>
			</View>
		);
	};

	return (
		<View style={styles.container}>
			{loading ? (
				<LoadingCost />
			) : (
				<View style={styles.content}>
					{insuranceType == strings.osago ? (
						<>
							<View>
								<Text style={styles.title}>
									{strings.osagoPolicyCost}
								</Text>
								<Text style={styles.title}>
									{strings.yourCost}
								</Text>
								<Text style={styles.cost}>
									{Math.round(cost)} сум
								</Text>
							</View>
							{cost !== costDiscounted && (
								<View>
									<Text style={styles.title}>
										{strings.insurancePremium}:
									</Text>
									<Text style={styles.cost}>
										{Math.round(costDiscounted)} сум
									</Text>
								</View>
							)}
							<View style={styles.buttonWrapper}>
								<RoundButton
									onPress={onButtonPress}
									gradient
									text={strings.checkout + " ONLINE"}
								/>
							</View>
						</>
					) : (
						<>
							<View>
								<Text style={styles.title}>
									{strings.vzrPolicyCost}
								</Text>
								{/* <Text style={styles.title}>
									{strings.yourCost}:
								</Text> */}
								<Text
									style={[
										styles.cost,
										{
											paddingTop: 10,
										},
									]}
								>
									{Math.ceil(vzrCost)} {strings.sum}
								</Text>
							</View>

							<View
								style={{
									alignItems: "center",
									justifyContent: "space-around",
									flexDirection: "row",
									paddingHorizontal: 20,
								}}
							>
								<Text
									style={{
										textTransform: "capitalize",
									}}
								>
									{strings.antiCovid}:
								</Text>
								<CustomSwitch
									value={vzr.antiCovid}
									onValueChange={setAntiCovid}
								/>
							</View>
							<View style={styles.buttonWrapper}>
								<RoundButton
									onPress={onButtonPress}
									gradient
									text={strings.payPolicy}
								/>
							</View>
						</>
					)}
				</View>
			)}
			<Image
				source={
					insuranceType === strings.osago
						? images.handHoldingCard
						: images.slider1
				}
				style={styles.image}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.ultraLightDark,
		justifyContent: "space-between",
	},
	loadingWrapper: {
		flex: 1,
		paddingHorizontal: CONTAINER_PADDING,
		alignItems: "center",
		justifyContent: "space-around",
	},
	loadingTitle: {
		fontSize: 22,
		fontWeight: "bold",
		textAlign: "center",
	},
	loadingText: {
		textAlign: "center",
	},
	content: {
		paddingTop: 30,
		flex: 1,
		paddingHorizontal: CONTAINER_PADDING,
		justifyContent: "space-around",
	},
	buttonWrapper: {
		paddingHorizontal: 3 * CONTAINER_PADDING,
	},
	title: {
		fontSize: 14,
		textAlign: "center",
	},
	cost: {
		fontSize: 28,
		fontWeight: "bold",
		textAlign: "center",
	},
	image: {
		height: deviceHeight * 0.32,
		width: deviceWidth,
		resizeMode: "contain",
	},
});

const mapStateToProps = ({ user, insurance: { osago, vzr } }) => ({
	osago,
	vzr,
	user,
});

const mapDispatchToProps = {
	setInsuranceCost,
	showLoading,
	hideLoading,
	showFlashMessage,
	setAntiCovid,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cost);
