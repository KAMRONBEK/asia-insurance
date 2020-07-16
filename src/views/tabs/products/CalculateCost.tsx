import React, { useEffect } from "react";
import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import Header from "../../../components/navigation/Header";
import { strings } from "../../../locales/strings";
import { colors, SCREENS, CONTAINER_PADDING } from "../../../constants";
import RoundButton from "../../../components/common/RoundButton";
import OptionCard from "../../../components/card/OptionCard";
import images from "../../../assets/images";
import { connect } from "react-redux";
import { isEmpty } from "../../../utils/functions";
import insurance from "../../../redux/reducers/insurance";

interface CalculateCostProps {
	route: any;
	navigation: any;
}

const CalculateCost = ({ route, navigation, osago }: CalculateCostProps) => {
	let { car, insuranceCases, privilege, insurancePeriod, driver } = osago;

	let insuranceList = [
		{
			insuranceType: strings.osago,
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
					desc: "Наличие предыдущих полисов",
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
					desc: "Имеете ли вы право на льготу",
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
					desc: "Годовое или сезонное",
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
					desc: "Укажите количество водителей",
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
			insuranceType: strings.vzr,
			menuList: [
				{
					mainIcon: images.carChecked,
					title: strings.destinationCountry,
					desc: "Укажите страну назначения",
					onPress: () => {
						console.warn("pressed");
					},
					small: true,
					icon: "flag",
					checked: true,
				},
				{
					mainIcon: images.userChecked,
					title: strings.tripPeriod,
					desc: "Даты вашего путешествия",
					onPress: () => {
						console.warn("pressed");
					},
					checked: true,
					small: true,
					icon: "calendar",
				},
				{
					mainIcon: images.flag,
					title: strings.tripPurpose,
					desc: "Указание целей поездки",
					onPress: () => {
						console.warn("pressed");
					},
					small: true,
					// passive: true,
					icon: "umbrella",
				},
				{
					mainIcon: images.flag,
					title: strings.insuredPerson,
					desc: "Индивидуальное или групповое",
					onPress: () => {
						console.warn("pressed");
					},
					small: true,
					// passive: true,
					icon: "profile-circle",
				},
			],
		},
	];

	let { insuranceType } = route.params;

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
				title={strings.costCalculation + " " + insuranceType}
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
				</View>
				<FlatList
					scrollEnabled={true}
					contentContainerStyle={styles.cardWrapper}
					data={
						insuranceType === strings.osago
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
					passive={
						isEmpty(car) ||
						isEmpty(insuranceCases) ||
						isEmpty(privilege) ||
						isEmpty(insurancePeriod) ||
						isEmpty(driver)
					}
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
	},
	topText: {
		fontSize: 16,
	},
	cardWrapper: {
		paddingHorizontal: 25,
		paddingBottom: 20,
	},
	buttonWrapper: {
		paddingHorizontal: CONTAINER_PADDING * 3,
	},
});
const mapStateToProps = ({ insurance: { osago } }) => ({
	osago,
});

export default connect(mapStateToProps)(CalculateCost);
