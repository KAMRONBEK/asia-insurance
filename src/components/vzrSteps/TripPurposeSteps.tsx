import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	TouchableOpacity,
} from "react-native";
import {
	setInsurance,
	setCurrentStep,
	showSelectionLoading,
	hideSelectionLoading,
} from "../../redux/actions";
import { requests } from "../../api/requests";
import InPageHeader from "../common/InPageHeader";
import { strings } from "../../locales/strings";
import PlainText from "../common/PlainText";
import { navigate } from "../../utils/NavigationService";
import { SCREENS, colors } from "../../constants";
import { SceneMap, TabView } from "react-native-tab-view";
import { connect } from "react-redux";
import reactotron from "../../redux/ReactotronConfig";

const TripPurposeSteps = ({
	setCurrentStep,
	setInsurance,
	showSelectionLoading,
	hideSelectionLoading,
}) => {
	setCurrentStep(3);

	let [isMulti, setIsMulti] = useState();
	let [selectedPeriod, setSelectedPeriod] = useState();
	let [multiPeriods, setPeriodSteps] = useState();
	let [selectedPurpose, setSelectedPurpose] = useState();
	let [selectedCount, setSelectedCount] = useState();

	const TripStepOne = ({ navigation }: any) => {
		let [periodList, setPeriodList] = useState([]);

		useEffect(() => {
			requests.dictionary
				.getTravelDictionary()
				.then((res) => {
					let array = [];
					console.log("travel", res.data.travelTypes);

					// res.data.travelTypes.map((item, index) => {
					// 	array.push({ name: item });
					// });
					Object.keys(res.data.travelTypes).map((index, value) => {
						array.push({
							name: res.data.travelTypes[index],
							id: index,
						});
						// console.warn(index);
					});
					setPeriodList(array);
				})
				.finally(() => {
					hideSelectionLoading();
				});
		}, []);
		const onOptionSelect = (item) => {
			// setIndex(index + 1);
			// let tempCountry = item;

			//is one time?
			if (item.id === "48a977e0-c657-4cdb-b0bf-1b9342bfbaa8") {
				setIndex(index + 2);
			} else {
				setIndex(index + 1);
			}
			setIsMulti(item);
			// setPurposeList(cloneList);
		};

		const initPurpose = async () => {
			try {
				let res = await requests.dictionary.getCountryList();
				console.log(res);
				let generatedList = res.data.map((country) => {
					return { ...country, selected: false };
				});
				// setPurposeList(generatedList);
			} catch (error) {
				console.log(error.response);
			}
		};

		useEffect(() => {
			showSelectionLoading();
			initPurpose();
		}, []);
		return (
			<View style={styles.content}>
				<InPageHeader title={strings.chooseTripType} />
				<FlatList
					keyExtractor={(item, index) => {
						(item + index).toString();
					}}
					data={periodList}
					renderItem={({ item }) => (
						<PlainText
							item={item}
							setIndex={setIndex}
							currentIndex={index}
							radio={true}
							onPress={() => onOptionSelect(item)}
						/>
					)}
				/>
				{/* {countryList.reduce()} */}
			</View>
		);
	};

	const TripStepTwo = ({ navigation }: any) => {
		let [multiPeriodOptions, setMultiPeriodptions] = useState([]);
		const onPeroidSelect = (item) => {
			setSelectedPeriod(item);
			setIndex(index + 1);
		};
		useEffect(() => {
			requests.dictionary.getTravelDictionary().then((res) => {
				let array = [];

				Object.keys(res.data.multiTravelPeriods).map((index, value) => {
					array.push({
						name: res.data.multiTravelPeriods[index],
						id: index,
					});
					// console.warn(index);
				});
				setMultiPeriodptions(array);
			});
		}, []);

		return (
			<View style={styles.content}>
				<InPageHeader title={strings.chooseTripDuration} />
				<FlatList
					keyExtractor={(item, index) => "key" + index}
					data={multiPeriodOptions}
					renderItem={({ item }) => (
						<PlainText
							item={item}
							radio={true}
							onPress={() => onPeroidSelect(item)}
						/>
					)}
				/>
			</View>
		);
	};

	const TripStepThree = ({ navigation }: any) => {
		const [purposeList, setPurposeList] = useState([]);
		const onPurposeSelect = (item) => {
			setSelectedPurpose(item);
			setIndex(index + 1);
		};
		useEffect(() => {
			requests.dictionary.getTravelDictionary().then((res) => {
				let array = [];

				Object.keys(res.data.travelGoals).map((index, value) => {
					array.push({
						name: res.data.travelGoals[index],
						id: index,
					});
					// console.warn(index);
				});
				setPurposeList(array);
			});
		}, []);

		return (
			<View style={styles.content}>
				<InPageHeader title={strings.chooseTripPurpose} />
				<FlatList
					keyExtractor={(item, index) => "key" + index}
					data={purposeList}
					renderItem={({ item }) => (
						<PlainText
							item={item}
							radio={true}
							onPress={() => onPurposeSelect(item)}
						/>
					)}
				/>
			</View>
		);
	};
	const TripStepFour = ({ navigation }: any) => {
		const [countList, setCountList] = useState([]);
		const onCountSelect = (item) => {
			// setSelectedCount(item);

			setInsurance({
				parent: "vzr",
				child: "tripPurpose",
				data: {
					isMulti: isMulti,
					selectedPeriod: selectedPeriod,
					multiPeriods: multiPeriods,
					purpose: selectedPurpose,
					peopleCount: item,
				},
			});

			navigate(SCREENS.calculateCost, {
				name: SCREENS.calculateCost,
				params: {},
			});
		};

		useEffect(() => {
			requests.dictionary.getTravelDictionary().then((res) => {
				let array = [];

				Object.keys(res.data.travelGroupTypes).map((index, value) => {
					if (index.split(",")[0] == 1 || index.split(",")[0] == 2) {
						array.push({
							name: res.data.travelGroupTypes[index],
							id: index,
						});
					}
					// console.warn(index);
				});

				setCountList(array);
			});
		}, []);

		return (
			<View style={styles.content}>
				<InPageHeader title={strings.choosePeopleCount} />
				<FlatList
					keyExtractor={(item, index) => "key" + index}
					data={countList}
					renderItem={({ item }) => (
						<PlainText
							item={item}
							radio={true}
							onPress={() => onCountSelect(item)}
						/>
					)}
				/>
			</View>
		);
	};

	const [index, setIndex] = useState(0);
	const [routes] = useState([
		{ key: "first", title: "First" },
		{ key: "second", title: "Second" },
		{ key: "third", title: "Third" },
		{ key: "fourth", title: "Fourth" },
	]);

	const renderScene = SceneMap({
		first: TripStepOne,
		second: TripStepTwo,
		third: TripStepThree,
		fourth: TripStepFour,
	});

	return (
		<>
			<TabView
				swipeEnabled={false}
				renderTabBar={() => null}
				navigationState={{ index, routes }}
				renderScene={renderScene}
				onIndexChange={setIndex}
			/>
		</>
	);
};
const styles = StyleSheet.create({
	content: {
		flex: 1,
		backgroundColor: colors.ultraLightDark,
	},
});

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
	setCurrentStep,
	showSelectionLoading,
	setInsurance,
	hideSelectionLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(TripPurposeSteps);
