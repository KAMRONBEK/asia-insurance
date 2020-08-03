import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { SceneMap, TabView } from "react-native-tab-view";
import { colors, SCREENS } from "../../constants";
import { navigate } from "../../utils/NavigationService";
import {
	setInsurance,
	showSelectionLoading,
	hideSelectionLoading,
	setCurrentStep,
} from "../../redux/actions";
import { db } from "../../db";
import InPageHeader from "../common/InPageHeader";
import { strings } from "../../locales/strings";
import { FlatList } from "react-native-gesture-handler";
import PlainText from "../common/PlainText";

const DriverSteps = ({
	osago,
	showSelectionLoading,
	hideSelectionLoading,
	setCurrentStep,
	setInsurance,
}) => {
	//set step initially
	setCurrentStep(5);

	let [driverCountList, setDriverCountList] = useState([
		{
			name: "НЕ ОГРАНИЧЕННО",
			value: "unlimited",
			id: 1,
			tariff: 0.3,
		},
		{
			name: "ОГРАНИЧЕННО",
			value: "limited",
			id: 2,
			tariff: 0.1,
		},
	]);
	console.warn(osago);

	useEffect(() => {
		console.warn(osago);
	}, [osago]);

	let onStepOnePress = (item) => {
		navigate(SCREENS.calculateCost, {
			name: SCREENS.calculateCost,
			params: {},
		});
		setInsurance({
			parent: "osago",
			child: "driver",
			data: {
				driverCount: item,
			},
		});
	};

	// useEffect(() => {
	// 	db.transaction((tx) => {
	// 		showSelectionLoading();
	// 		tx.executeSql(
	// 			"SELECT SrokName as name, srokid as id, tariff as tariff,days as days FROM tbSrok ",
	// 			[],
	// 			(tx, results) => {
	// 				setDriverCountList(results.rows.raw());
	// 				setTimeout(() => {
	// 					hideSelectionLoading();
	// 				}, 200);
	// 			},
	// 			(err) => {
	// 				console.warn(err);
	// 			}
	// 		);
	// 	});
	// }, []);

	const DriverStepOne = () => {
		return (
			<View style={styles.content}>
				<InPageHeader title={strings.driverCount + ":"} />
				<FlatList
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{
						paddingBottom: 20,
					}}
					data={driverCountList}
					keyExtractor={(e) => e.id.toString()}
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
		first: DriverStepOne,
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

export default connect(mapStateToProps, mapDispatchToProps)(DriverSteps);
