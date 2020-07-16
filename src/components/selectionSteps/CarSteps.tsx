import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import SearchBar from "../common/SearchBar";
import InPageHeader from "../common/InPageHeader";
import PlainText from "../common/PlainText";
import { strings } from "../../locales/strings";
import { db } from "../../db";
import { colors, SCREENS } from "../../constants";
import { Text } from "react-native-svg";
import { TabView, SceneMap } from "react-native-tab-view";
import { navigate } from "../../utils/NavigationService";
import {
	setInsurance,
	showSelectionLoading,
	hideSelectionLoading,
	setCurrentStep,
} from "../../redux/actions";
import { connect } from "react-redux";

const CarSteps = ({
	setInsurance,
	showSelectionLoading,
	hideSelectionLoading,
	setCurrentStep,
}: any) => {
	//set step initially
	setCurrentStep(1);

	let [carMakeId, setCarMakeId] = useState("");

	let [carMake, setCarMake] = useState({});
	let [carModel, setCarModel] = useState({});
	let [carType, setCarType] = useState({});
	let [carRegisterPlace, setCarRegisterPlace] = useState({});

	// const CarStepOne = () => {
	// 	const [carList, setCarList] = useState([]);

	// 	const onStepOnePress = (item) => {
	// 		setCarMakeId(item.id);
	// 		setCarMake(item);
	// 		setIndex(index + 1);
	// 	};
	// 	useEffect(() => {
	// 		db.transaction((tx) => {
	// 			showSelectionLoading();
	// 			tx.executeSql(
	// 				"SELECT vehiclemakename as name, vehiclemakeid as id FROM tbVehicleMake",
	// 				[],
	// 				(tx, results) => {
	// 					setCarList(results.rows.raw());
	// 					// setTimeout(() => {
	// 					// 	hideSelectionLoading();
	// 					// }, 2000);
	// 				},
	// 				(err) => {
	// 					console.warn(err);
	// 				}
	// 			);
	// 		});
	// 	}, []);

	// 	return (
	// 		<View style={styles.content}>
	// 			<SearchBar
	// 				placeholder={strings.yourCarMark}
	// 				list={carList}
	// 				setList={setCarList}
	// 			/>
	// 			<FlatList
	// 				keyExtractor={(index) => {
	// 					index.toString();
	// 				}}
	// 				showsVerticalScrollIndicator={false}
	// 				contentContainerStyle={{
	// 					paddingBottom: 20,
	// 				}}
	// 				data={carList}
	// 				renderItem={({ item }) => {
	// 					return (
	// 						<PlainText
	// 							item={item}
	// 							setIndex={setIndex}
	// 							currentIndex={index}
	// 							setValue={setCarMakeId}
	// 							onPress={() => onStepOnePress(item)}
	// 						/>
	// 					);
	// 				}}
	// 			/>
	// 		</View>
	// 	);
	// };

	// const CarStepTwo = ({ navigation }: any) => {
	// 	const [carModelList, setCarModelList] = useState([]);
	// 	const onStepTwoPress = (item) => {
	// 		setIndex(index + 1);
	// 		setCarModel(item);
	// 	};
	// 	useEffect(() => {
	// 		db.transaction((tx) => {
	// 			tx.executeSql(
	// 				`SELECT VehicleModelId as id, VehicleModelName as name FROM tbVehicleModel WHERE VehicleMakeId=${carMakeId}`,
	// 				[],
	// 				(tx, results) => {
	// 					setCarModelList(results.rows.raw());
	// 					// hideSelectionLoading();
	// 				},
	// 				(err) => {
	// 					console.warn(err);
	// 				}
	// 			);
	// 		});
	// 	}, []);
	// 	return (
	// 		<View style={styles.content}>
	// 			<SearchBar placeholder={strings.selectCarModel} />
	// 			<FlatList
	// 				keyExtractor={(index) => {
	// 					index.toString();
	// 				}}
	// 				data={carModelList}
	// 				renderItem={({ item }) => (
	// 					<PlainText
	// 						item={item}
	// 						setIndex={setIndex}
	// 						currentIndex={index}
	// 						onPress={() => onStepTwoPress(item)}
	// 					/>
	// 				)}
	// 			/>
	// 		</View>
	// 	);
	// };
	const CarStepThree = ({ navigation }: any) => {
		const [carTypeList, setCarTypeList] = useState([]);
		const onStepThreePress = (item) => {
			setIndex(index + 1);
			setCarType(item);
		};
		useEffect(() => {
			showSelectionLoading();
			db.transaction((tx) => {
				tx.executeSql(
					`SELECT VehicleTypeName as name,VehicleTypeId as id,tariff as tariff FROM tbVehicleType `,
					[],
					(tx, results) => {
						setCarTypeList(results.rows.raw());
						hideSelectionLoading();
					},
					(err) => {
						// console.warn(err);
					}
				);
			});
		}, []);
		return (
			<View style={styles.content}>
				<InPageHeader title={strings.selectCarType} />
				<FlatList
					keyExtractor={(index) => {
						index.toString();
					}}
					data={carTypeList}
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

	const CarStepFour = ({ navigation }: any) => {
		const [carRegisterPlaceList, setCarRegisterPlaceList] = useState([]);
		const onStepFourPress = (item) => {
			navigate(SCREENS.calculateCost, {
				name: SCREENS.calculateCost,
				params: {},
			});
			setInsurance({
				parent: "osago",
				child: "car",
				data: {
					// carMake: carMake,
					// carModel: carModel,
					carType: carType,
					carRegisterPlace: item,
				},
			});
		};

		useEffect(() => {
			db.transaction((tx) => {
				tx.executeSql(
					`SELECT TerretoryName as name, TerretoryId as id, tariff as tariff FROM tbTerretory order by terretoryid `,
					[],
					(tx, results) => {
						setCarRegisterPlaceList(results.rows.raw());
						// hideSelectionLoading();
						hideSelectionLoading();
					},
					(err) => {
						//console.warn(err);
					}
				);
			});
		}, []);
		return (
			<View style={styles.content}>
				<InPageHeader title={strings.carRegisterPlace} />
				<FlatList
					keyExtractor={(item, index) => "key" + index}
					data={carRegisterPlaceList}
					renderItem={({ item }) => (
						<PlainText
							item={item}
							setIndex={setIndex}
							currentIndex={index}
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
		// { key: "third", title: "Third" },
		// { key: "fourth", title: "Fourth" },
	]);

	const renderScene = SceneMap({
		first: CarStepThree,
		second: CarStepFour,
		// third: CarStepThree,
		// fourth: CarStepFour,
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

export default connect(mapStateToProps, mapDispatchToProps)(CarSteps);
