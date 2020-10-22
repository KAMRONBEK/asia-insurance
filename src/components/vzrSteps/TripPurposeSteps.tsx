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
} from "../../redux/actions";
import { requests } from "../../api/requests";
import InPageHeader from "../common/InPageHeader";
import { strings } from "../../locales/strings";
import PlainText from "../common/PlainText";
import { navigate } from "../../utils/NavigationService";
import { SCREENS, colors } from "../../constants";
import { SceneMap, TabView } from "react-native-tab-view";
import { connect } from "react-redux";

const TripPurposeSteps = ({
	setCurrentStep,
	setInsurance,
	showSelectionLoading,
}) => {
	setCurrentStep(3);

	let [countries, setCountries] = useState({});

	const TripStepOne = ({ navigation }: any) => {
		const [purposeList, setPurposeList] = useState([]);
		const onPurposeSelect = (item) => {
			// setIndex(index + 1);
			// let tempCountry = item;
			setIndex(index + 1);
			// setPurposeList(cloneList);
		};

		const initPurpose = async () => {
			try {
				let res = await requests.dictionary.getCountryList();
				console.log(res);
				let generatedList = res.data.map((country) => {
					return { ...country, selected: false };
				});
				setPurposeList(generatedList);
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
				<InPageHeader title={strings.chooseTripPurpose} />
				<FlatList
					keyExtractor={(item, index) => {
						(item + index).toString();
					}}
					data={purposeList}
					renderItem={({ item }) => (
						<PlainText
							item={item}
							setIndex={setIndex}
							currentIndex={index}
							radio={true}
							onPress={() => onPurposeSelect(item)}
						/>
					)}
				/>
				{/* {countryList.reduce()} */}
			</View>
		);
	};

	const TripStepTwo = ({ navigation }: any) => {
		const [carRegisterPlaceList, setCarRegisterPlaceList] = useState([]);
		const onCountPress = (item) => {
			navigate(SCREENS.calculateCost, {
				name: SCREENS.calculateCost,
				params: {},
			});
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
		};

		useEffect(() => {}, []);

		return (
			<View style={styles.content}>
				<InPageHeader title={strings.choosePeopleCount} />
				<FlatList
					keyExtractor={(item, index) => "key" + index}
					data={carRegisterPlaceList}
					renderItem={({ item }) => (
						<PlainText
							item={item}
							radio={true}
							onPress={() => onCountPress(item)}
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
		first: TripStepOne,
		second: TripStepTwo,
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
};

export default connect(mapStateToProps, mapDispatchToProps)(TripPurposeSteps);
