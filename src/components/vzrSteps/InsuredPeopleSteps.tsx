import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
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

const InsuredPeopleSteps = ({ hideSelectionLoading }) => {
	//insured person data

	useEffect(() => {
		hideSelectionLoading();
	}, []);

	const InsuredStepOne = ({ navigation }: any) => {
		// const [carRegisterPlaceList, setCarRegisterPlaceList] = useState([]);
		const onNextPress = (item) => {
			setIndex(index + 1);
		};

		useEffect(() => {}, []);

		return (
			<View style={styles.content}>
				<InPageHeader title={strings.choosePeopleCount} />
				{/* 38 page verstka */}
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
});
