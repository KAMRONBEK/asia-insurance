import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	TouchableOpacity,
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { db } from "../../db";
import InPageHeader from "../common/InPageHeader";
import { strings } from "../../locales/strings";
import PlainText from "../common/PlainText";
import Input from "../common/Input";
import { colors, CONTAINER_PADDING, SCREENS } from "../../constants";
import { connect } from "react-redux";
import { navigate } from "../../utils/NavigationService";
import {
	setInsurance,
	showSelectionLoading,
	hideSelectionLoading,
	setCurrentStep,
	hideLoading,
} from "../../redux/actions";
import { requests } from "../../api/requests";

const InsuranceCaseSteps = ({
	setInsurance,
	showSelectionLoading,
	hideSelectionLoading,
	setCurrentStep,
}: any) => {
	//set step initially
	setCurrentStep(2);

	let [availableInsurance, setAvailableInsurance] = useState({});
	let [insuranceSeries, setInsuranceSeries] = useState();
	let [haveViolation, setHaveViolation] = useState();

	const InsuranceStepOne = () => {
		const [insuranceCasesList, setInsuranceCasesList] = useState([]);
		const onStepOnePress = (item) => {
			if (item.id == 1) {
				setIndex(index + 2);
			} else {
				setIndex(index + 1);
			}
			setAvailableInsurance(item);
		};

		const getInsuranceCaseTypes = async () => {
			let res = await requests.dictionary.getInsuranceCaseTypes();
			let temp = res.data;
			temp.map((item, index) => {
				item.name = item.text;
			});
			setInsuranceCasesList(temp);
		};

		useEffect(() => {
			getInsuranceCaseTypes();
			// showSelectionLoading();
			// db.transaction((tx) => {
			// 	tx.executeSql(
			// 		"SELECT InsuranceCaseTypeName as name, priority as id,tariff as tariff FROM tbInsuranceCaseType ORDER by priority ",
			// 		[],
			// 		(tx, results) => {
			// 			setInsuranceCasesList(results.rows.raw());
			// 			setTimeout(() => {
			// 				hideSelectionLoading();
			// 			}, 200);
			// 		},
			// 		(err) => {
			// 			// console.warn(err);
			// 		}
			// 	);
			// });
		}, []);

		return (
			<View style={styles.content}>
				<InPageHeader title={strings.availableInsuranceCases + ":"} />
				<FlatList
					keyExtractor={(item, index) => "key" + index}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{
						paddingBottom: 20,
					}}
					data={insuranceCasesList}
					renderItem={({ item }) => {
						return (
							<PlainText
								radio
								item={item}
								setIndex={setIndex}
								currentIndex={index}
								onPress={() => onStepOnePress(item)}
							/>
						);
					}}
				/>
			</View>
		);
	};

	const InsuranceStepTwo = ({ navigation }: any) => {
		const onStepTwoPress = (value) => {
			setIndex(index + 1);
			setInsuranceSeries(value);
		};

		return (
			<View style={styles.content}>
				<InPageHeader title={strings.availableInsuranceCases + ":"} />
				<View style={styles.inputWrapper}>
					<Input
						placeholder={strings.oldPolicyNumber}
						onSubmit={(value) => onStepTwoPress(value)}
					/>
				</View>
				<View style={styles.nextWrapper}>
					<TouchableOpacity
						onPress={() => {
							setIndex(index + 1);
							setInsuranceSeries("");
						}}
					>
						<Text style={styles.next}>{strings.next}</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	};

	const InsuranceStepThree = ({ navigation }: any) => {
		const violationStates = [{ name: strings.yes }, { name: strings.no }];
		const onStepThreePress = (item) => {
			setInsurance({
				parent: "osago",
				child: "insuranceCases",
				data: {
					availableInsurance: availableInsurance,
					insuranceSeries: insuranceSeries,
					haveViolation: item,
				},
			});
			navigate(SCREENS.calculateCost, {
				name: SCREENS.calculateCost,
				params: {},
			});
		};

		return (
			<View style={styles.content}>
				<InPageHeader title={strings.doYouHaveViolation + ":"} />
				<FlatList
					keyExtractor={(item, index) => "key" + index}
					data={violationStates}
					renderItem={({ item }) => (
						<PlainText
							item={item}
							setIndex={setIndex}
							currentIndex={index}
							radio={true}
							onPress={() => onStepThreePress(item)}
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
	]);

	const renderScene = SceneMap({
		first: InsuranceStepOne,
		second: InsuranceStepTwo,
		third: InsuranceStepThree,
	});

	return (
		<TabView
			swipeEnabled={false}
			renderTabBar={() => null}
			navigationState={{ index, routes }}
			renderScene={renderScene}
			onIndexChange={setIndex}
		/>
	);
};

const styles = StyleSheet.create({
	content: {
		flex: 1,
		backgroundColor: colors.ultraLightDark,
	},
	inputWrapper: {
		paddingHorizontal: CONTAINER_PADDING,
		paddingTop: 20,
	},
	nextWrapper: {
		position: "absolute",
		bottom: 20,
		right: 40,
	},
	next: {
		fontSize: 15,
		fontWeight: "bold",
		color: colors.grayText,
	},
});

const mapStateToProps = ({ insurance: { osago } }) => ({
	osago,
});

const mapDispatchToProps = {
	setInsurance,
	showSelectionLoading,
	hideSelectionLoading,
	setCurrentStep,
};

export default connect(mapStateToProps, mapDispatchToProps)(InsuranceCaseSteps);
