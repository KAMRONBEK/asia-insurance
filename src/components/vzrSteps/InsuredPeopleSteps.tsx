import React, { useEffect, useState } from "react";
import {
	FlatList,
	KeyboardAvoidingView,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";
import { connect } from "react-redux";
import {
	BORDER_RADIUS,
	colors,
	deviceWidth,
	Icons,
	SCREENS,
} from "../../constants";
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
import DatePicker from "react-native-datepicker";
import { TouchableOpacity } from "react-native-gesture-handler";
import DateInput from "../common/DateInput";
import moment from "moment";
import CustomSwitch from "../common/CustomSwitch";
import DocUploadCard from "../card/DocUploadCard";
import ImageUploadCard from "../card/ImageUploadCard";

const InsuredPeopleSteps = ({
	hideSelectionLoading,
	setInsurance,
	peopleCount,
}) => {
	//insured person data

	useEffect(() => {
		hideSelectionLoading();
	}, []);

	let [insuredPerson, setInsuredPerson] = useState({});

	const InsuredStepOne = ({ navigation }: any) => {
		// const [carRegisterPlaceList, setCarRegisterPlaceList] = useState([]);

		const [state, setState] = useState({});
		let [name, setName] = useState();
		let [midName, setMidName] = useState();
		let [lastName, setLastName] = useState();
		let [birthDate, setBirthDate] = useState();
		let [passport, setPassport] = useState();
		let [isTraveller, setIsTraveller] = useState(false);
		// let [country, setCountry] = useState();
		// let [region, setRegion] = useState();

		let [countryList, setCountryList] = useState([]);
		let [regionList, setRegionList] = useState([]);

		const onNextPress = (item) => {
			if (
				peopleCount?.id.includes("7d6c154c-fbba-4ad3-a469-cce8771c5677")
			) {
				setInsurance({
					parent: "vzr",
					child: "insuredPerson",
					data: {
						insuredPerson: {
							name: name,
							midName: midName,
							lastName: lastName,
							// country: country,
							// region: region,
							birthDate: birthDate,
						},
					},
				});

				navigate(SCREENS.calculateCost, {
					name: SCREENS.calculateCost,
					params: {},
				});
			} else {
				setInsuredPerson({
					name: name,
					midName: midName,
					lastName: lastName,
					// country: country,
					// region: region,
					birthDate: birthDate,
				});
				setIndex(index + 1);
			}
		};

		// const initDictionary = async () => {
		// 	try {
		// 		let res = await requests.dictionary.getCountryList();
		// 		let temp = res.data.map((region, index) => {
		// 			return {
		// 				label: region.text,
		// 				value: {
		// 					text: region.text,
		// 					id: region.id,
		// 				},
		// 				key: index,
		// 			};
		// 		});
		// 		let resRegion = await requests.dictionary.getRegionList();
		// 		let tempRegion = resRegion.data.map((region, index) => {
		// 			return {
		// 				label: region.text,
		// 				value: {
		// 					text: region.text,
		// 					id: region.id,
		// 				},
		// 				key: index,
		// 			};
		// 		});
		// 		setCountryList(temp);
		// 		console.log(temp);

		// 		setRegionList(tempRegion);
		// 	} catch (error) {
		// 		console.log(error.response);
		// 	} finally {
		// 		hideSelectionLoading();
		// 	}
		// };

		// let generateHandler = (key) => {
		// 	return (e) => {
		// 		setState({ ...state, [key]: e });
		// 	};
		// };

		return (
			<View style={styles.content}>
				<InPageHeader title={strings.enterInsuredPersonData} />
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
						<DateInput
							setValue={setBirthDate}
							value={birthDate}
							placeholder={strings.pickBirthDate}
						/>
						<ImageUploadCard
							name={strings.passport}
							setSingleDocument={setPassport}
							data={passport}
							setData={setPassport}
							docType={8}
						/>
						<View style={styles.row}>
							<Text style={styles.bigText}>
								{strings.isTraveller}
							</Text>
							<CustomSwitch
								value={isTraveller}
								onValueChange={setIsTraveller}
							/>
						</View>
						{/* <DatePicker
							style={{
								borderRadius: BORDER_RADIUS,
								backgroundColor: colors.white,
								justifyContent: "space-between",
								width: "100%",
								padding: 10,
								marginBottom: 20,
								marginTop: 10,
							}}
							date={birthDate}
							mode="date"
							placeholder={strings.pickBirthDate}
							format="DD.MM.YYYY"
							minDate="01.01.1900"
							maxDate={new Date()}
							confirmBtnText={strings.yes}
							cancelBtnText={strings.no}
							iconComponent={
								<Icons
									name="calendar"
									size={20}
									color={colors.gray}
								/>
							}
							customStyles={{
								dateIcon: {
									height: 30,
									width: 30,
								},
								dateInput: {
									borderWidth: 0,
									marginRight: 20,
									borderRadius: BORDER_RADIUS,
								},
								dateTouchBody: {
									width: "100%",
									justifyContent: "space-between",
									overflow: "hidden",
									paddingRight: 10,
								},
								// ... You can check the source to find the other keys.
							}}
							onDateChange={(date) => {
								setBirthDate(date);
							}}
						/> */}
						{/* <Select
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
						/> */}
					</ScrollView>
				</View>
				<View style={{ paddingHorizontal: 40 }}>
					<RoundButton
						text={strings.next}
						gradient
						onPress={onNextPress}
						passive={!name || !lastName || !birthDate}
					/>
				</View>
			</View>
		);
	};

	const InsuredStepTwo = ({ navigation }: any) => {
		let [extraPeopleList, setExtraPeopleList] = useState(1);
		let [extraPeopleData, setExtraPeopleData] = useState<Array<object>>([]);

		let [tempDate, setTempDate] = useState();

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
			console.log(extraPeopleData);
		}, [extraPeopleData]);

		const onNextPress = (item) => {
			setInsurance({
				parent: "vzr",
				child: "insuredPerson",
				data: {
					insuredPerson: insuredPerson,
					extraPeople: extraPeopleData,
				},
			});

			navigate(SCREENS.calculateCost, {
				name: SCREENS.calculateCost,
				params: {},
			});
		};

		useEffect(() => {
			// initDictionary();
		}, []);

		return (
			<View style={styles.content}>
				<InPageHeader title={strings.additionalTripMembers} />
				{/* 39 page verstka */}
				<View style={styles.content}>
					<ScrollView
						style={styles.form}
						contentContainerStyle={{
							paddingBottom: 40,
						}}
					>
						{[...new Array(extraPeopleList)].map(
							(person, index) => (
								<>
									<Text
										style={{
											paddingBottom: 10,
											color: colors.black,
											fontWeight: "bold",
										}}
									>
										{strings.member} {index + 1}
									</Text>
									<Input
										placeholder={strings.lastName}
										value={extraPeopleData[index]?.lastName}
										setValue={(text) => {
											const newValues = {
												...extraPeopleData[index],
												lastName: text,
											};
											let newList = [...extraPeopleData];
											newList[index] = newValues;

											setExtraPeopleData(newList);
										}}
									/>
									<Input
										placeholder={strings.firstName}
										value={
											extraPeopleData[index]?.firstName
										}
										setValue={(text) => {
											const newValues = {
												...extraPeopleData[index],
												firstName: text,
											};
											let newList = [...extraPeopleData];
											newList[index] = newValues;
											setExtraPeopleData(newList);
										}}
									/>
									<Input
										placeholder={strings.midName}
										value={extraPeopleData[index]?.midName}
										setValue={(text) => {
											const newValues = {
												...extraPeopleData[index],
												midName: text,
											};
											let newList = [...extraPeopleData];
											newList[index] = newValues;
											setExtraPeopleData(newList);
										}}
									/>
									{/* date */}
									<DateInput
										value={
											extraPeopleData[index]?.birthDate
										}
										setValue={(date) => {
											const newValues = {
												...extraPeopleData[index],
												birthDate: date,
											};
											let newList = [...extraPeopleData];
											newList[index] = newValues;
											setExtraPeopleData(newList);
										}}
										placeholder={strings.pickBirthDate}
									/>
									<ImageUploadCard
										name={strings.passport}
										setSingleDocument={(data) => {
											const newValues = {
												...extraPeopleData[index],
												passport: data,
											};
											let newList = [...extraPeopleData];
											newList[index] = newValues;
											setExtraPeopleData(newList);
										}}
										data={extraPeopleData[index]?.passport}
										docType={1}
									/>
									{/* <Select
								placeholder={strings.country}
								options={countryList}
								key={"country"}
								icon="flag"
								selectValue={(value) => {
									const newValues = {
										...extraPeopleData[index],
										country: value,
									};
									let newList = [...extraPeopleData];
									newList[index] = newValues;
									setExtraPeopleData(newList);
								}}
							/>
							<Select
								placeholder={strings.region}
								options={regionList}
								key={"region"}
								icon="flag"
								selectValue={(value) => {
									const newValues = {
										...extraPeopleData[index],
										region: value,
									};
									let newList = [...extraPeopleData];
									newList[index] = newValues;
									setExtraPeopleData(newList);
								}}
							/> */}
								</>
							)
						)}
						{extraPeopleList <= 5 && (
							<TouchableOpacity
								onPress={() => {
									setExtraPeopleList(extraPeopleList + 1);
								}}
							>
								<View
									style={{
										alignItems: "center",
									}}
								>
									<Text
										style={{
											fontSize: 18,
											color: colors.darkBlue,
											fontWeight: "bold",
										}}
									>
										{strings.addMember}
									</Text>
								</View>
							</TouchableOpacity>
						)}
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
		<KeyboardAvoidingView
			style={{
				flex: 1,
			}}
			behavior={"height"}
		>
			<TabView
				swipeEnabled={true}
				renderTabBar={() => null}
				navigationState={{ index, routes }}
				renderScene={renderScene}
				onIndexChange={setIndex}
			/>
		</KeyboardAvoidingView>
	);
};

const mapStateToProps = ({ insurance }) => ({
	peopleCount: insurance.vzr.tripPurpose.peopleCount,
});

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
	row: {
		flexDirection: "row",
		paddingVertical: 15,
		paddingHorizontal: 20,
		backgroundColor: colors.white,
		marginBottom: 20,
		justifyContent: "space-between",
		alignItems: "center",
	},
	bigText: {
		maxWidth: deviceWidth - 100,
	},
});
