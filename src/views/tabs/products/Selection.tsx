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
import CarSteps from "../../../components/selectionSteps/CarSteps";
import { defined } from "react-native-reanimated";
import { Text } from "react-native-svg";
import InsuranceCaseSteps from "../../../components/selectionSteps/InsuranceCaseSteps";
import PrivilegesSteps from "../../../components/selectionSteps/PrivilegesSteps";
import SelectionLoading from "../../../components/container/SelectionLoading";
import InsurancePeriodSteps from "../../../components/selectionSteps/InsurancePeriodSteps";
import DriverSteps from "../../../components/selectionSteps/DriverSteps";
import { connect } from "react-redux";
import { isEmpty, extractNames } from "../../../utils/functions";

const Selection = ({ navigation, route, currentStep, osago }) => {
	let { title } = route.params;
	let { stepCount } = route.params;
	let { insuranceType } = route.params;

	let [boxList, setBoxList] = useState([]);

	useEffect(() => {
		setBoxList(extractNames(osago, "osago"));
	}, [osago]);

	const RenderStep = () => {
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
				<FlatList
					keyExtractor={(item, index) => "key" + index}
					renderItem={({ item }) => <SelectItem item={item} />}
					data={boxList}
					contentContainerStyle={styles.box}
					showsVerticalScrollIndicator={false}
				/>
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

const mapStateToProps = ({ insurance: { currentStep, osago } }) => ({
	currentStep,
	osago,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Selection);
