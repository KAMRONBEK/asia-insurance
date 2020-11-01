import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, ScrollView } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import Header from "../../../components/navigation/Header";
import { strings } from "../../../locales/strings";
import { colors, CONTAINER_PADDING } from "../../../constants";
import SelectItem from "../../../components/common/SelectItem";
import SearchBar from "../../../components/common/SearchBar";
import InPageHeader from "../../../components/common/InPageHeader";
import images from "../../../assets/images";
import CarSteps from "../../../components/osagoSteps/CarSteps";
import { defined } from "react-native-reanimated";
import { Text } from "react-native-svg";
import InsuranceCaseSteps from "../../../components/osagoSteps/InsuranceCaseSteps";
import PrivilegesSteps from "../../../components/osagoSteps/PrivilegesSteps";
import SelectionLoading from "../../../components/container/SelectionLoading";
import InsurancePeriodSteps from "../../../components/osagoSteps/InsurancePeriodSteps";
import DriverSteps from "../../../components/osagoSteps/DriverSteps";
import { connect } from "react-redux";
import { isEmpty, extractNames } from "../../../utils/functions";
import CountrySteps from "../../../components/vzrSteps/CountrySteps";
import PeriodSteps from "../../../components/vzrSteps/PeriodSteps";
import TripPurposeSteps from "../../../components/vzrSteps/TripPurposeSteps";
import InsuredPeopleSteps from "../../../components/vzrSteps/InsuredPeopleSteps";
import reactotron from "reactotron-react-native";

const Selection = ({ navigation, route, currentStep, osago, vzr }) => {
	let { title } = route.params;
	let { stepCount } = route.params;
	let { insuranceType } = route.params;

	let [boxList, setBoxList] = useState([]);

	useEffect(() => {
		switch (insuranceType) {
			case strings.osago: {
				setBoxList(extractNames(osago, "osago"));
			}
			case strings.vzr: {
				let countries = vzr.destinationCountry?.countries?.filter(
					(country) => {
						let newCountry = {
							parent: "vzr",
							child: "destinationCountry",
							...country,
						};
						return newCountry;
					}
				);

				let array = [];
				reactotron.warn({ countries });

				if (countries?.length > 0) {
					array = countries;
				}

				if (vzr.tripPurpose) {
					array = [
						...array,
						{
							parent: "vzr",
							child: "tripPurpose",
							name: vzr.tripPurpose?.isMulti?.name,
						},

						{
							parent: "vzr",
							child: "tripPurpose",
							name: vzr.tripPurpose?.purpose?.name,
						},
						{
							parent: "vzr",
							child: "tripPurpose",
							name: vzr.tripPurpose?.peopleCount?.name,
						},
					];
				}

				reactotron.warn(array);

				// let countriesArray = Object.keys(countriesObj).map((key) => [
				// 	countriesObj[key],
				// ]);

				setBoxList(array);
			}
		}
	}, [osago, vzr]);

	useEffect(() => {
		console.log(boxList);
	}, [boxList]);

	const RenderStep = () => {
		switch (insuranceType) {
			case strings.osago: {
				console.log(insuranceType);
				switch (title) {
					case strings.car:
						return <CarSteps />;
					case strings.insuranceCases:
						return <InsuranceCaseSteps />;
					case strings.availablePrivileges:
						return <PrivilegesSteps />;
					case strings.insurancePeriod:
						return <InsurancePeriodSteps />;
					case strings.driver:
						return <DriverSteps />;
					default:
						return (
							<View>
								<Text>no selection</Text>
							</View>
						);
				}
			}

			case strings.vzr: {
				console.log(insuranceType);
				switch (title) {
					case strings.destinationCountry:
						return <CountrySteps />;
					case strings.tripPeriod:
						return <PeriodSteps />;
					case strings.tripPurpose:
						return <TripPurposeSteps />;
					case strings.insuredPerson:
						return <InsuredPeopleSteps />;
					case strings.driver:
						return <DriverSteps />;
					default:
						return (
							<View>
								<Text>no selection</Text>
							</View>
						);
				}
			}
			default:
				return (
					<View>
						<Text>no selection</Text>
					</View>
				);
		}
	};

	return (
		<View style={styles.container}>
			<Header
				close
				alignLeft
				title={title}
				navigation={navigation}
				round
				step={[currentStep, stepCount]}
			/>
			{/* <View style={{ height: 130, overflow: "visible" }}>
				<View style={{ flex: 1 }}>
					<ScrollView contentContainerStyle={styles.box}>
						{boxList.map((item, index) => {
							if (item) {
								return <SelectItem item={item} key={index} />;
							}
						})}
					</ScrollView>
				</View>
			</View> */}
			<View style={{ height: 130, overflow: "visible" }}>
				{boxList.length > 0 ? (
					<FlatList
						keyExtractor={(item, index) => "key" + index}
						renderItem={({ item }) => <SelectItem item={item} />}
						data={boxList}
						contentContainerStyle={styles.box}
						showsVerticalScrollIndicator={false}
					/>
				) : (
					<Text>no item</Text>
				)}
			</View>
			<RenderStep />
			<SelectionLoading />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.ultraLightDark,
	},
	box: {
		flexDirection: "row",
		padding: CONTAINER_PADDING,
		flexWrap: "wrap",
	},
	content: {
		flex: 1,
	},
});

const mapStateToProps = ({ insurance: { currentStep, osago, vzr } }) => ({
	currentStep,
	osago,
	vzr,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Selection);
