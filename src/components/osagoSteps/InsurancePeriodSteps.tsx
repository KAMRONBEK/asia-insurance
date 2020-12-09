import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";
import { colors, SCREENS } from "../../constants";
import InPageHeader from "../common/InPageHeader";
import { strings } from "../../locales/strings";
import PlainText from "../common/PlainText";
import { db } from "../../db";
import {
	showSelectionLoading,
	hideSelectionLoading,
	setInsurance,
	setCurrentStep,
} from "../../redux/actions";
import { connect } from "react-redux";
import { navigate } from "../../utils/NavigationService";
import { requests } from "../../api/requests";

const InsurancePeriodSteps = ({
	setInsurance,
	showSelectionLoading,
	hideSelectionLoading,
	osago,
	setCurrentStep,
}) => {
	//set step initially
	setCurrentStep(4);

	let isResidence = osago?.privilege?.residence.name == "ДА";

	console.warn(isResidence);

	const InsurancePeriodOne = () => {
		let [periodList, setPeriodList] = useState();
		console.warn(osago);

		useEffect(() => {
			console.warn(osago);
		}, [osago]);

		let onStepOnePress = (item) => {
			navigate(SCREENS.calculateCost, {
				name: SCREENS.calculateCost,
				params: {},
			});
			console.warn(item, "period");

			setInsurance({
				parent: "osago",
				child: "insurancePeriod",
				data: {
					period: item,
				},
			});
		};

		const getPeriod = async () => {
			showSelectionLoading();

			try {
				let res = await requests.dictionary.getPeriod();
				let temp = res.data;
				console.log(res.data);

				temp.map((item, index) => {
					if (item.id == 1) {
						item.days = 15;
					}
					if (item.id == 2) {
						item.days = 60;
					}
					if (item.id == 3) {
						item.days = 365;
					}
					item.name = item.text;
				});
				setPeriodList(temp);
			} catch (error) {
				console.log(error);
			} finally {
				hideSelectionLoading();
			}
		};

		const getSrok = async () => {
			showSelectionLoading();
			try {
				let res = await requests.dictionary.getSrok();
				let temp = res.data;
				console.log(res.data);

				temp.map((item, index) => {
					if (item.id == 1) {
						item.days = 233;
					}
					if (item.id == 2) {
						item.days = 365;
					}
					if (item.id == 3) {
						item.days = 20;
					}
					item.name = item.text;
				});
				setPeriodList(temp);
			} catch (error) {
				console.log(error.response);
			} finally {
				hideSelectionLoading();
			}
		};

		useEffect(() => {
			isResidence ? getPeriod() : getSrok();
			// db.transaction((tx) => {
			// 	tx.executeSql(
			// 		isResidence
			// 			? "SELECT periodid as id,periodname as name,days as days,fondid as fondId,tariff as tariff FROM tbPeriod "
			// 			: "SELECT SrokName as name, srokid as id, tariff as tariff,days as days FROM tbSrok ",
			// 		[],
			// 		(tx, results) => {
			// 			setPeriodList(results.rows.raw());
			// 			setTimeout(() => {
			// 				hideSelectionLoading();
			// 			}, 200);
			// 		},
			// 		(err) => {
			// 			console.warn(err);
			// 		}
			// 	);
			// });
		}, []);

		return (
			<View style={styles.content}>
				<InPageHeader title={strings.insurancePeriod + ":"} />
				<FlatList
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{
						paddingBottom: 20,
					}}
					data={periodList}
					keyExtractor={(e) => e.index}
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

	const [index, setIndex] = useState(0);
	const [routes] = useState([{ key: "first", title: "First" }]);

	const renderScene = SceneMap({
		first: InsurancePeriodOne,
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

const mapStateToProps = ({ insurance: { osago } }) => ({
	osago,
});

const mapDispatchToProps = {
	showSelectionLoading,
	hideSelectionLoading,
	setInsurance,
	setCurrentStep,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(InsurancePeriodSteps);
