import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { db } from "../../db";
import { colors, SCREENS } from "../../constants";
import PlainText from "../common/PlainText";
import InPageHeader from "../common/InPageHeader";
import { strings } from "../../locales/strings";
import { navigate } from "../../utils/NavigationService";
import {
	showSelectionLoading,
	hideSelectionLoading,
	setInsurance,
	setCurrentStep,
} from "../../redux/actions";
import { connect } from "react-redux";
import { requests } from "../../api/requests";

const PrivilegesSteps = ({
	showSelectionLoading,
	hideSelectionLoading,
	setInsurance,
	setCurrentStep,
	osago,
}) => {
	//set step initially
	setCurrentStep(3);

	useEffect(() => {
		console.warn(osago);
	}, [osago]);

	let [residence, setResidence] = useState();
	let [individualStatus, setIndividualStatus] = useState();
	let [availablePrivilege, setAvailablePrivilege] = useState();

	const PrivilegesStepOne = () => {
		const [privilegesList, setPrivilegesList] = useState([]);
		const onStepOnePress = (item) => {
			setInsurance({
				parent: "osago",
				child: "privilege",
				data: {
					availablePrivilege: item,
					residence: residence,
					individualStatus: individualStatus, //individualStatus
				},
			});

			navigate(SCREENS.calculateCost, {
				name: SCREENS.calculateCost,
				params: {},
			});
		};

		const getLgots = async () => {
			showSelectionLoading();

			try {
				let res = await requests.dictionary.getLgots();
				let temp = res.data;
				temp.map((item, index) => {
					item.name = item.text;
				});
				setPrivilegesList(temp);
			} catch (error) {
				console.log(error);
			} finally {
				hideSelectionLoading();
			}
		};

		useEffect(() => {
			getLgots();

			// db.transaction((tx) => {
			// tx.executeSql(
			// 	"SELECT LgotyId as id, LgotyName as name,tariff_f as tariff FROM tbLgoty",
			// 	[],
			// 	(tx, results) => {
			// 		setPrivilegesList(results.rows.raw());
			// 		setTimeout(() => {}, 300);
			// 	},
			// 	(err) => {
			// 		console.warn(err);
			// 	}
			// );
			// });
		}, []);

		return (
			<View style={styles.content}>
				<InPageHeader title={strings.availablePrivileges + ":"} />
				<FlatList
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{
						paddingBottom: 20,
					}}
					data={privilegesList}
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

	const PrivilegesStepTwo = () => {
		const uzbekistanResidenceStates = [
			{
				name: strings.yes,
			},
			{
				name: strings.no,
			},
		];
		const onStepTwoPress = (item) => {
			setResidence(item);
			setIndex(index + 1);
		};

		return (
			<View style={styles.content}>
				<InPageHeader
					title={
						strings.doYouHaveResidence +
						" " +
						strings.uzbekistan +
						"?"
					}
				/>
				<FlatList
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{
						paddingBottom: 20,
					}}
					data={uzbekistanResidenceStates}
					renderItem={({ item }) => {
						return (
							<PlainText
								radio
								item={item}
								setIndex={setIndex}
								currentIndex={index}
								onPress={() => onStepTwoPress(item)}
							/>
						);
					}}
				/>
			</View>
		);
	};
	const PrivilegesStepThree = () => {
		const individualStatuses = [
			{ name: strings.individual },
			{ name: strings.legalEntity },
		];
		const onStepThreePress = (item) => {
			setIndividualStatus(item);

			if (
				item.name == strings.individual &&
				residence.name == strings.yes
			) {
				setIndex(index + 1);
			} else {
				setInsurance({
					parent: "osago",
					child: "privilege",
					data: {
						availablePrivilege: {
							id: 1,
							name: "БЕЗ ЛЬГОТ",
							tariff: 1,
						},
						residence: residence,
						individualStatus: item, //individualStatus
					},
				});

				navigate(SCREENS.calculateCost, {
					name: SCREENS.calculateCost,
					params: {},
				});
			}
		};

		return (
			<View style={styles.content}>
				<InPageHeader
					title={
						strings.doYouHaveResidence + strings.uzbekistan + "?"
					}
				/>
				<FlatList
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{
						paddingBottom: 20,
					}}
					data={individualStatuses}
					renderItem={({ item }) => {
						return (
							<PlainText
								radio
								item={item}
								setIndex={setIndex}
								currentIndex={index}
								onPress={() => onStepThreePress(item)}
							/>
						);
					}}
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
		first: PrivilegesStepTwo,
		second: PrivilegesStepThree,
		third: PrivilegesStepOne,
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
});

const mapStateToProps = ({ insurance: { osago } }) => ({ osago });

const mapDispatchToProps = {
	showSelectionLoading,
	hideSelectionLoading,
	setInsurance,
	setCurrentStep,
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivilegesSteps);
