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
import { setInsuranceCost } from "../../../redux/actions";

const Cost = ({ navigation, route, osago, vzr, setInsuranceCost }) => {
	let [loading, setLoading] = useState(true);
	let { insuranceType } = route.params;

	let [cost, setCost] = useState(1);
	let [costDiscounted, setCostDiscounted] = useState(0);

	let tariffList = extractTariffs(osago, "osago");

	let osagoTariff =
		tariffList.reduce((prev, current) => {
			// console.warn(prev, current);
			return prev * Number.parseFloat(current.tariff);
		}, 1) / osago.privilege.availablePrivilege.tariff;

	useEffect(() => {
		setCost(osagoTariff * 40000000);
		setCostDiscounted(
			osagoTariff * 40000000 * osago.privilege.availablePrivilege.tariff
		);
		setInsuranceCost(
			osagoTariff * 40000000 * osago.privilege.availablePrivilege.tariff
		);

		// setTimeout(() => {
		setLoading(false);
		// }, 3000);
	}, []);

	const onButtonPress = () => {
		navigation.navigate(SCREENS.checkout);
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
									{strings.yourCost}:
								</Text>
								<Text style={styles.cost}>
									{Math.round(cost)} сум
								</Text>
							</View>
							<View>
								<Text style={styles.title}>
									{strings.insurancePremium}:
								</Text>
								<Text style={styles.cost}>
									{Math.round(costDiscounted)} сум
								</Text>
							</View>
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
								<Text style={styles.title}>
									{strings.yourCost}:
								</Text>
								<Text
									style={[
										styles.cost,
										{
											paddingTop: 10,
										},
									]}
								>
									162 000 сум
								</Text>
							</View>
							<View>
								<Text style={styles.title}>
									{strings.insurancePremium}:
								</Text>
								<Text style={styles.cost}>810 000 сум</Text>
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

const mapStateToProps = ({ insurance: { osago, vzr } }) => ({
	osago,
	vzr,
});

const mapDispatchToProps = {
	setInsuranceCost,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cost);
