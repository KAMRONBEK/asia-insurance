import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";
import { connect } from "react-redux";
import { colors, SCREENS } from "../../constants";
import { strings } from "../../locales/strings";
import { navigate } from "../../utils/NavigationService";
import InPageHeader from "../common/InPageHeader";
import PlainText from "../common/PlainText";
import {
	setInsurance,
	setCurrentStep,
	showSelectionLoading,
	hideSelectionLoading,
} from "../../redux/actions";
import RoundButton from "../common/RoundButton";
import Input from "../common/Input";
import Select from "../common/Select";
import { requests } from "../../api/requests";

const InsuredPeopleSteps = ({ hideSelectionLoading }) => {
	//insured person data

	useEffect(() => {
		hideSelectionLoading();
	}, []);

	const InsuredStepOne = ({ navigation }: any) => {
		// const [carRegisterPlaceList, setCarRegisterPlaceList] = useState([]);
		const onNextPress = (item) => {
			// setIndex(index + 1);

			setInsurance({
				parent: "vzr",
				child: "insuredPerson",
				data: {
					insuredPerson: {
						name: name,
						midName: midName,
						lastName: lastName,
						country: country,
						region: region,
					},
				},
			});

			navigate(SCREENS.calculateCost, {
				name: SCREENS.calculateCost,
				params: {},
			});
		};

		const [state, setState] = useState({});
		let [name, setName] = useState();
		let [midName, setMidName] = useState();
		let [lastName, setLastName] = useState();
		let [country, setCountry] = useState();
		let [region, setRegion] = useState();

		let [countryList, setCountryList] = useState([]);
		let [regionList, setRegionList] = useState([]);

		const initDictionary = async () => {
			try {
				let res = await requests.dictionary.getCountryList();
				let temp = res.data.map((region, index) => {
					return {
						label: region.text,
						value: {
							text: region.text,
							id: region.id,
						},
						key: index,
					};
				});
				let resRegion = await requests.dictionary.getRegionList();
				let tempRegion = resRegion.data.map((region, index) => {
					return {
						label: region.text,
						value: {
							text: region.text,
							id: region.id,
						},
						key: index,
					};
				});
				setCountryList(temp);
				console.log(temp);

				setRegionList(tempRegion);
			} catch (error) {
				console.log(error.response);
			} finally {
				hideSelectionLoading();
			}
		};

		useEffect(() => {
			initDictionary();
		}, []);

		// let generateHandler = (key) => {
		// 	return (e) => {
		// 		setState({ ...state, [key]: e });
		// 	};
		// };

		return (
			<View style={styles.content}>
				<InPageHeader title={strings.choosePeopleCount} />
				{/* 38 page verstka */}
				<View style={styles.content}>
					<ScrollView
						style={styles.form}
						contentContainerStyle={{
							paddingBottom: 40,
						}}
					>
						<Input
							placeholder={strings.lastName}
							value={state.lastName}
							setValue={setLastName}
						/>
						<Input
							placeholder={strings.firstName}
							value={state.firstName}
							setValue={setName}
						/>
						<Input
							placeholder={strings.midName}
							value={state.midName}
							setValue={setMidName}
						/>
						<Select
							placeholder={strings.country}
							options={countryList}
							key={"country"}
							icon="flag"
							selectValue={setCountry}
						/>
						<Select
							placeholder={strings.region}
							options={regionList}
							key={"region"}
							icon="flag"
							selectValue={setRegion}
						/>
					</ScrollView>
				</View>
				<View style={{ paddingHorizontal: 20 }}>
					<RoundButton
						text={strings.next}
						gradient
						onPress={onNextPress}
					/>
				</View>
			</View>
		);
	};

	const InsuredStepTwo = ({ navigation }: any) => {
		// const [carRegisterPlaceList, setCarRegisterPlaceList] = useState([]);
		const onNextPress = (item) => {
			navigate(SCREENS.calculateCost, {
				name: SCREENS.calculateCost,
				params: {},
			});
		};

		useEffect(() => {}, []);

		return (
			<View style={styles.content}>
				<InPageHeader title={strings.choosePeopleCount} />
				{/* 39 page verstka */}
				<View style={styles.content}></View>
				<View style={{ paddingHorizontal: 20 }}>
					<RoundButton
						text={strings.next}
						gradient
						onPress={onNextPress}
					/>
				</View>
			</View>
		);
	};

	const [index, setIndex] = useState(0);
	const [routes] = useState([
		{ key: "first", title: "First" },
		{ key: "second", title: "Second" },
	]);

	const renderScene = SceneMap({
		first: InsuredStepOne,
		second: InsuredStepTwo,
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

const mapStateToProps = ({ state }) => ({});

const mapDispatchToProps = {
	setCurrentStep,
	showSelectionLoading,
	setInsurance,
	hideSelectionLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(InsuredPeopleSteps);

const styles = StyleSheet.create({
	content: {
		flex: 1,
		backgroundColor: colors.ultraLightDark,
	},
	form: {
		padding: 20,
	},
});
