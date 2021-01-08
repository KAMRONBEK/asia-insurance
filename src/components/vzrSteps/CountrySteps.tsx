import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import SearchBar from "../common/SearchBar";
import InPageHeader from "../common/InPageHeader";
import PlainText from "../common/PlainText";
import { strings } from "../../locales/strings";
import { db } from "../../db";
import { colors, SCREENS } from "../../constants";
import { TabView, SceneMap } from "react-native-tab-view";
import { navigate } from "../../utils/NavigationService";
import Text from "../../components/common/Text";
import {
	setInsurance,
	showSelectionLoading,
	hideSelectionLoading,
	setCurrentStep,
} from "../../redux/actions";
import { connect } from "react-redux";
import { requests } from "../../api/requests";
import PackageCard from "../common/PackageCard";
import Modal from "../container/Modal";
import reactotron from "../../redux/ReactotronConfig";

const CountrySteps = ({
	setInsurance,
	showSelectionLoading,
	hideSelectionLoading,
	setCurrentStep,
}: any) => {
	//set step initially
	setCurrentStep(1);

	/**
	 * Selected countries
	 */
	let [countries, setCountries] = useState([]);

	const CountryStepOne = ({ navigation }: any) => {
		const [countryList, setCountryList] = useState([]);
		const [originalList, setOriginalList] = useState([]);

		const onCountrySelect = (item) => {
			// setIndex(index + 1);
			// let tempCountry = item;
			let cloneList = countryList.map((country) => {
				if (item.id == country.id) {
					return { ...country, selected: !country.selected };
				} else {
					return country;
				}
			});
			setCountryList(cloneList);
			setOriginalList(cloneList);
		};

		const onNextPress = () => {
			let resultCountries = originalList.filter((country) => {
				if (country.selected == true) {
					return country;
				}
			});

			console.log(resultCountries, "here");
			setCountries(resultCountries);
			setIndex(index + 1);
		};

		const initCountry = async () => {
			try {
				let res = await requests.dictionary.getCountryList();
				console.log(res.data.length, "countries found");
				let generatedList = res.data.map((country) => {
					return { ...country, selected: false, name: country.text };
				});
				// console.log(generatedList[0]);

				setCountryList(generatedList);
				setOriginalList(generatedList);
			} catch (error) {
				console.log(error.response);
			} finally {
				hideSelectionLoading();
			}
		};

		useEffect(() => {
			showSelectionLoading();
			initCountry();
		}, []);
		return (
			<View style={styles.content}>
				<SearchBar
					placeholder={strings.destinationCountry}
					list={originalList}
					setList={setCountryList}
				/>
				<FlatList
					keyExtractor={(item, index) => {
						(item + index).toString();
					}}
					data={countryList}
					renderItem={({ item }) => (
						<PlainText
							item={item}
							setIndex={setIndex}
							currentIndex={index}
							radio={true}
							onPress={() => onCountrySelect(item)}
						/>
					)}
				/>
				{/* {countryList.reduce()} */}
				<View style={[styles.nextWrapper]}>
					<TouchableOpacity onPress={onNextPress}>
						<Text style={styles.next}>{strings.next}</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	};

	const CountryStepTwo = ({ navigation }: any) => {
		const [programList, setProgramList] = useState([]);

		let effect = async () => {
			let levels = countries.reduce(
				(prev, current) => ({ ...prev, [current.level]: true }),
				{}
			);
			reactotron.warn({ levels });
			let levelsStr = Object.keys(levels).reduce(
				(prev, current, index) =>
					prev +
					current +
					(index !== Object.keys(levels).length - 1 ? "," : ""),
				""
			);
			console.log(levelsStr);
			let res = await requests.dictionary.getProgram(levelsStr);
			console.log(res.data);
			setProgramList(res.data.data.reverse());
		};

		useEffect(() => {
			effect();
		}, []);

		const onStepFourPress = (item) => {
			// setInsurance({
			// 	parent: "osago",
			// 	child: "car",
			// 	data: {
			// 		// carMake: carMake,
			// 		// carModel: carModel,
			// 		carType: carType,
			// 		carRegisterPlace: item,
			// 	},
			// });
			setInsurance({
				parent: "vzr",
				child: "destinationCountry",
				data: {
					countries: countries,
					program: item,
				},
			});

			navigate(SCREENS.calculateCost, {
				name: SCREENS.calculateCost,
				params: {},
			});
		};

		useEffect(() => {}, []);

		return (
			<View style={styles.content}>
				<InPageHeader title={strings.packageSelection} />
				<FlatList
					keyExtractor={(item, index) => "key" + index}
					data={programList}
					renderItem={({ item }) => (
						<PackageCard
							item={item}
							radio={true}
							onPress={() => onStepFourPress(item)}
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
	]);

	const renderScene = SceneMap({
		first: CountryStepOne,
		second: CountryStepTwo,
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
	nextWrapper: {
		position: "absolute",
		alignItems: "flex-end",
		paddingVertical: 8,
		paddingHorizontal: 12,
		bottom: 5,
		right: 5,
		borderRadius: 100,
		backgroundColor: colors.lightBlue,
	},
	next: {
		fontSize: 16,
		fontWeight: "700",
		color: colors.white,
	},
});

const mapStateToProps = ({ insurance: { osago, vzr } }) => ({
	osago,
	vzr,
});
const mapDispatchToProps = {
	showSelectionLoading,
	hideSelectionLoading,
	setInsurance,
	setCurrentStep,
};

export default connect(mapStateToProps, mapDispatchToProps)(CountrySteps);
