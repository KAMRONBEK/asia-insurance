import React, { useEffect } from "react";
import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import Header from "../../../components/navigation/Header";
import { strings } from "../../../locales/strings";
import {
	colors,
	SCREENS,
	CONTAINER_PADDING,
	deviceWidth,
} from "../../../constants";
import RoundButton from "../../../components/common/RoundButton";
import OptionCard from "../../../components/card/OptionCard";
import images from "../../../assets/images";
import { connect } from "react-redux";
import { isEmpty } from "../../../utils/functions";
import { refreshInsurance } from "../../../redux/actions/insurance";
import reactotron from "../../../redux/ReactotronConfig";
import CustomButton from "../../../components/common/CustomButton";

interface CalculateCostProps {
	route: any;
	navigation: any;
}

const CalculateCost = ({
	route,
	navigation,
	osago,
	vzr,
	refreshInsurance,
	language,
}: CalculateCostProps) => {
	let { car, insuranceCases, privilege, insurancePeriod, driver } = osago;
	let { destinationCountry, tripDuration, tripPurpose, insuredPerson } = vzr;
	reactotron.logImportant({
		destinationCountry,
		isEmpty: isEmpty(destinationCountry),
	});
	let insuranceList = [
		{
			insuranceType: "osago",
			menuList: [
				{
					title: strings.car,
					desc: strings.infoAboutCar,
					onPress: () => {
						console.warn("pressed");
					},
					small: true,
					icon: "car",
					checked: !isEmpty(car),
				},
				{
					title: strings.insuranceCases,
					desc: strings.previousPolicies,
					onPress: () => {
						console.warn("pressed");
					},
					small: true,
					icon: "profile-circle",
					checked: !isEmpty(insuranceCases),
					passive: isEmpty(car),
				},
				{
					mainIcon: images.flag,
					title: strings.availablePrivileges,
					desc: strings.canYouGetPrivilege,
					onPress: () => {
						console.warn("pressed");
					},
					small: true,
					passive: isEmpty(car) || isEmpty(insuranceCases),
					icon: "flag",
					checked: !isEmpty(privilege),
				},
				{
					mainIcon: images.calendar,
					title: strings.insurancePeriod,
					desc: strings.yearOrSeason,
					onPress: () => {
						console.warn("pressed");
					},
					small: true,
					passive:
						isEmpty(car) ||
						isEmpty(insuranceCases) ||
						isEmpty(privilege),
					checked: !isEmpty(insurancePeriod),
					icon: "calendar",
				},
				{
					mainIcon: images.umbrellaCoin,
					title: strings.driver,
					desc: strings.numberOfDrivers,
					onPress: () => {
						console.warn("pressed");
					},
					small: true,
					checked: !isEmpty(driver),
					passive:
						isEmpty(car) ||
						isEmpty(insuranceCases) ||
						isEmpty(privilege) ||
						isEmpty(insurancePeriod),
					icon: "umbrella-coins",
				},
			],
		},
		{
			insuranceType: "vzr",
			menuList: [
				{
					mainIcon: images.carChecked,
					title: strings.destinationCountry,
					desc: strings.selectDestinationCountry,
					onPress: () => {
						console.warn("pressed");
					},
					small: true,
					icon: "flag",
					checked: !isEmpty(destinationCountry),
				},
				{
					mainIcon: images.userChecked,
					title: strings.tripPeriod,
					desc: strings.travelDates,
					onPress: () => {
						console.warn("pressed");
					},
					small: true,
					icon: "calendar",
					checked: !isEmpty(tripDuration),
				},
				{
					mainIcon: images.flag,
					title: strings.tripPurpose,
					desc: strings.specifyTripPurpose,
					onPress: () => {
						console.warn("pressed");
					},
					small: true,
					icon: "umbrella",
					checked: !isEmpty(tripPurpose),
				},
				{
					mainIcon: images.flag,
					title: strings.insuredPerson,
					desc: strings.individualOrGroup,
					onPress: () => {
						console.warn("pressed");
					},
					small: true,
					icon: "profile-circle",
					checked: !isEmpty(insuredPerson),
				},
			],
		},
	];

	let { insuranceType } = route.params;
	let insurance = insuranceType == "osago" ? strings.osago : strings.vzr;

	let isButtonPassive = () => {
		console.log(insuranceType, "from param");

		switch (insuranceType) {
			case "osago":
				return (
					isEmpty(car) ||
					isEmpty(insuranceCases) ||
					isEmpty(privilege) ||
					isEmpty(insurancePeriod) ||
					isEmpty(driver)
				);

			case "vzr":
				return false;
			default:
				break;
		}
	};

	let onRefreshPress = () => {
		switch (insuranceType) {
			case "osago":
				console.log("here");
				refreshInsurance("osago");
				break;
			case "vzr":
				refreshInsurance("vzr");
				break;
			default:
				break;
		}
	};

	const onButtonPress = () => {
		navigation.navigate(SCREENS.cost, {
			insuranceType: insuranceType,
		});
	};

	return (
		<View style={styles.container}>
			<Header
				back
				alignLeft
				navigation={navigation}
				title={
					// strings.costCalculation + " " +
					insurance
				}
				round
			/>
			<ScrollView
				showsVerticalScrollIndicator={false}
				style={styles.content}
			>
				<View style={styles.top}>
					<Text style={styles.topText}>
						{strings.fillInfoForCostCalculation}
					</Text>

					<CustomButton
						text={strings.resetData}
						onPress={onRefreshPress}
						backgroundColor={colors.white}
						color={colors.red}
						border
					/>
				</View>
				<FlatList
					scrollEnabled={true}
					contentContainerStyle={styles.cardWrapper}
					data={
						insuranceType === "osago"
							? insuranceList[0].menuList
							: insuranceList[1].menuList
					}
					keyExtractor={(item, index) => "key" + index}
					renderItem={({ item }) => (
						<OptionCard
							// onPress={onCardPress}
							navigation={navigation}
							mainIcon={item.mainIcon}
							title={item.title}
							desc={item.desc}
							passive={item.passive}
							small={item.small}
							icon={item.icon}
							checked={item.checked}
							insuranceType={insuranceType}
							item={item}
						/>
					)}
				/>
			</ScrollView>
			<View style={styles.buttonWrapper}>
				<RoundButton
					text={strings.calculate}
					gradient
					onPress={onButtonPress}
					passive={isButtonPassive()}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.ultraLightDark,
	},
	content: {},
	top: {
		padding: 20,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	topText: {
		fontSize: 16,
		maxWidth: (2 * deviceWidth) / 3,
	},
	cardWrapper: {
		paddingHorizontal: 25,
		paddingBottom: 20,
	},
	buttonWrapper: {
		paddingHorizontal: CONTAINER_PADDING * 3,
		backgroundColor: "transparent",
	},
	topButtonWrapper: {
		paddingLeft: (2 * deviceWidth) / 3,
		paddingRight: 20,
	},
});
const mapStateToProps = ({
	insurance: { osago, vzr },
	user: { language },
}) => ({
	osago,
	vzr,
	language,
});

const mapDispatchToProps = {
	refreshInsurance,
};

export default connect(mapStateToProps, mapDispatchToProps)(CalculateCost);
