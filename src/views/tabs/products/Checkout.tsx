import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, TextInput } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import {
	colors,
	CONTAINER_PADDING,
	deviceWidth,
	BORDER_RADIUS,
	SCREENS,
	Icons,
} from "../../../constants";
import Header from "../../../components/navigation/Header";
import { strings } from "../../../locales/strings";
import RoundButton from "../../../components/common/RoundButton";
import ImageUploadCard from "../../../components/card/ImageUploadCard";
import Text from "../../../components/common/Text";
import Input from "../../../components/common/Input";
import CustomSwitch from "../../../components/common/CustomSwitch";
import Select from "../../../components/common/Select";
import PlainText from "../../../components/common/PlainText";
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { setShippingInfo } from "../../../redux/actions";

const limDriverForm = {
	first: strings.driverPassport,
	second: strings.driverLicense,
	third: strings.attorneyPower,
	type: "driver",
};

const unlimDriverForm = {
	first: strings.relativePassport,
	second: strings.driverLicense,
	third: strings.metric,
	type: "relative",
};

const Checkout = ({ navigation, osago, checkout, setShippingInfo, cost }) => {
	//checkout datas goes here
	let [sameAddress, setSameAddress] = useState(false);
	let driverLimited = osago?.driver?.driverCount?.value == "limited";

	let Document = () => {
		let [driversDocuments, setDriversDocuments] = useState([]);
		let [driverDocumentList, setDriverDocumentList] = useState([]);

		const onPress = () => {
			setIndex(index + 1);
		};

		let onAddPress = () => {
			if (driverLimited) {
				setDriverDocumentList([...driverDocumentList, limDriverForm]);
			} else {
				setDriverDocumentList([...driverDocumentList, unlimDriverForm]);
			}
		};

		return (
			<View style={styles.document}>
				<ScrollView
					contentContainerStyle={{
						paddingBottom: 80,
					}}
					showsVerticalScrollIndicator={false}
					style={{ flex: 1 }}
				>
					<ImageUploadCard
						name={strings.applicantsPassport}
						data={driversDocuments}
						setData={setDriversDocuments}
					/>
					<ImageUploadCard
						name={strings.ownerPassport}
						data={driversDocuments}
						setData={setDriversDocuments}
					/>
					<ImageUploadCard
						name={strings.techPassport}
						data={driversDocuments}
						setData={setDriversDocuments}
					/>
					{driverDocumentList.map((driver, index) => (
						<>
							<Text style={styles.bold}>
								{driver.type == "driver"
									? strings.driver
									: strings.relative}{" "}
								{index + 1}
							</Text>
							<ImageUploadCard
								name={driver.first}
								data={driversDocuments}
								setData={setDriversDocuments}
							/>
							<ImageUploadCard
								name={driver.second}
								data={driversDocuments}
								setData={setDriversDocuments}
							/>
							<ImageUploadCard
								name={driver.third}
								data={driversDocuments}
								setData={setDriversDocuments}
							/>
						</>
					))}
					{driverDocumentList.length < 5 && (
						<TouchableOpacity onPress={onAddPress}>
							<View style={styles.plusWrapper}>
								<Text
									style={[
										styles.bold,
										{ color: colors.lightBlue },
									]}
								>
									{strings.addDriver}
								</Text>
							</View>
						</TouchableOpacity>
					)}
				</ScrollView>

				<View style={styles.buttonWrapper}>
					<RoundButton
						text={strings.next}
						gradient
						onPress={onPress}
						passive={driversDocuments.length < 3}
					/>
				</View>
			</View>
		);
	};
	let PersonalInfo = () => {
		let [isOwner, setIsOwner] = useState(false);
		let [isDriver, setIsDriver] = useState(false);

		let [pin, setPin] = useState("");
		let [lastName, setLastName] = useState("");
		let [name, setName] = useState("");
		let [middleName, setMiddleName] = useState("");

		const onPress = () => {
			setIndex(index + 1);
		};
		return (
			<View style={styles.personal}>
				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{
						paddingBottom: 60,
					}}
				>
					<View style={styles.personalContent}>
						<Text style={[styles.bold, styles.textCenter]}>
							{strings.pleaseFillPersonalData}
						</Text>
						<Input placeholder={strings.pinfl} setValue={setPin} />
						<Input
							placeholder={strings.lastName}
							setValue={setLastName}
						/>
						<Input
							placeholder={strings.firstName}
							setValue={setName}
						/>
						<Input
							placeholder={strings.midName}
							setValue={setMiddleName}
						/>
					</View>
					<View style={styles.row}>
						<Text style={styles.bigText}>
							{strings.areYouOwnerOfCar}
						</Text>
						<CustomSwitch
							value={isOwner}
							onValueChange={setIsOwner}
						/>
					</View>
					<View style={styles.row}>
						<Text style={styles.bigText}>
							{strings.areYouDriverOfCar}
						</Text>
						<CustomSwitch
							value={isDriver}
							onValueChange={setIsDriver}
						/>
					</View>
				</ScrollView>
				<View style={styles.buttonWrapper}>
					<RoundButton
						text={strings.next}
						gradient
						onPress={onPress}
						passive={!pin || !name || !lastName || !middleName}
					/>
				</View>
			</View>
		);
	};
	// let InsurancePeriod = () => {
	// 	const onPress = () => {
	// 		setIndex(index + 1);
	// 	};
	// 	return (
	// 		<View style={styles.period}>
	// 			<Select
	// 				placeholder={strings.chooseInsurancePeriod}
	// 				options={[{ label: "label", value: "value" }]}
	// 			/>
	// 			<Select
	// 				placeholder={strings.realisationDate}
	// 				options={[{ label: "label", value: "value" }]}
	// 			/>
	// 			<View style={styles.buttonWrapper}>
	// 				<RoundButton
	// 					text={strings.next}
	// 					gradient
	// 					onPress={onPress}
	// 				/>
	// 			</View>
	// 		</View>
	// 	);
	// };
	let LocationInfo = () => {
		const onPress = () => {
			setIndex(index + 1);
		};

		let [country, setCountry] = useState("");
		let [region, setRegion] = useState("");
		let [district, setDistrict] = useState("");
		let [street, setStreet] = useState("");
		let [house, setHouse] = useState("");
		let [phone, setPhone] = useState("");

		return (
			<View style={styles.location}>
				<ScrollView
					contentContainerStyle={{
						paddingBottom: 60,
					}}
					showsVerticalScrollIndicator={false}
				>
					<View style={styles.locationContent}>
						<Text style={[styles.bold, styles.textCenter]}>
							{strings.pleaseFillPersonalData}
						</Text>
						<Select
							placeholder={strings.country}
							options={[
								{ label: "Uzbekistan", value: "Uzbekistan" },
							]}
							selectValue={setCountry}
						/>
						<Select
							selectValue={setRegion}
							placeholder={strings.region}
							options={[
								{
									label: "ГОРОД  ТАШКЕНТ",
									value: "ГОРОД  ТАШКЕНТ",
								},
								{
									label: "ТАШКЕНТСКИЙ ВИЛОЯТ",
									value: "ТАШКЕНТСКИЙ ВИЛОЯТ",
								},
								{
									label: "СЫРДАРЬИНСКИЙ ВИЛОЯТ",
									value: "СЫРДАРЬИНСКИЙ ВИЛОЯТ",
								},
								{
									label: "ДЖИЗАКСКИЙ ВИЛОЯТ",
									value: "ДЖИЗАКСКИЙ ВИЛОЯТ",
								},
								{
									label: "САМАРКАНДСКИЙ ВИЛОЯТ",
									value: "САМАРКАНДСКИЙ ВИЛОЯТ",
								},
								{
									label: "ФЕРГАНСКИЙ ВИЛОЯТ",
									value: "ФЕРГАНСКИЙ ВИЛОЯТ",
								},
								{
									label: "НАМАНГАНСКИЙ ВИЛОЯТ",
									value: "НАМАНГАНСКИЙ ВИЛОЯТ",
								},
								{
									label: "АНДИЖАНСКИЙ ВИЛОЯТ",
									value: "АНДИЖАНСКИЙ ВИЛОЯТ",
								},
								{
									label: "КАШКАДАРЬИНСКИЙ ВИЛОЯТ",
									value: "КАШКАДАРЬИНСКИЙ ВИЛОЯТ",
								},
								{
									label: "СУРХАНДАРЬИНСКИЙ ВИЛОЯТ",
									value: "СУРХАНДАРЬИНСКИЙ ВИЛОЯТ",
								},
								{
									label: "БУХАРСКИЙ ВИЛОЯТ",
									value: "БУХАРСКИЙ ВИЛОЯТ",
								},
								{
									label: "НАВОИЙ ВИЛОЯТИ",
									value: "НАВОИЙ ВИЛОЯТИ",
								},
								{
									label: "ХОРЕЗМСКИЙ ВИЛОЯТ",
									value: "ХОРЕЗМСКИЙ ВИЛОЯТ",
								},
							]}
						/>
						<Select
							selectValue={setDistrict}
							placeholder={strings.district}
							options={[
								{
									label: "ЖОНДОРСКИЙ ТУМАН",
									value: "ЖОНДОРСКИЙ ТУМАН",
								},
								{
									label: "ЧИМБОЙ ГОРОД",
									value: "ЧИМБОЙ ГОРОД",
								},
								{
									label: "ГОРОД КУМКУРГАН",
									value: "ГОРОД КУМКУРГАН",
								},
								{
									label: "ГОРОД МУЙНАК",
									value: "ГОРОД МУЙНАК",
								},
								{
									label: "ГОРОД ШАФИРКАН",
									value: "ГОРОД ШАФИРКАН",
								},
								{
									label: "ГУРЛАНСКИЙ ТУМАН",
									value: "ГУРЛАНСКИЙ ТУМАН",
								},
							]}
						/>
						<Input
							placeholder={strings.street}
							setValue={setStreet}
						/>
						<Input
							placeholder={strings.house}
							setValue={setHouse}
						/>
						<Input
							placeholder={strings.phone}
							setValue={setPhone}
						/>
					</View>
				</ScrollView>
				<View style={styles.buttonWrapper}>
					<RoundButton
						text={strings.next}
						gradient
						onPress={onPress}
						passive={
							!country ||
							!region ||
							!district ||
							!street ||
							!house ||
							!phone
						}
					/>
				</View>
			</View>
		);
	};
	let Shipping = () => {
		let [withShipping, setWithShipping] = useState(false);

		const onPress = () => {
			setIndex(index + 1);
			setShippingInfo({
				withShipping: withShipping
					? strings.shipping
					: strings.takeFromOffice,
			});
		};
		return (
			<View style={styles.shipping}>
				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{
						paddingBottom: 60,
					}}
				>
					<View style={styles.shippingContent}>
						<Text style={[styles.bold, styles.textCenter]}>
							{strings.pleaseFillShippingData}
						</Text>
						<PlainText
							radio
							item={{ name: strings.shippingToDoor }}
							onPress={() => {
								console.warn(withShipping);
								setWithShipping(true);
							}}
							selected={withShipping}
						/>
						<PlainText
							radio
							item={{ name: strings.takeFromOffice }}
							onPress={() => {
								setWithShipping(false);
							}}
							selected={!withShipping}
						/>
					</View>
					<View
						style={[
							styles.row,
							{
								marginTop: 30,
							},
						]}
					>
						<Text style={styles.bigText}>
							{strings.isShippingAddressAndLivingAddressSame}
						</Text>
						<CustomSwitch
							value={sameAddress}
							onValueChange={setSameAddress}
						/>
					</View>
					{withShipping && (
						<View style={styles.shippingContent}>
							<View style={styles.textArea}>
								<TextInput
									multiline={true}
									placeholder={
										strings.enterFullAddressForShipping
									}
									style={styles.input}
								/>
							</View>
						</View>
					)}
				</ScrollView>
				<View style={styles.buttonWrapper}>
					<RoundButton
						text={strings.next}
						gradient
						onPress={onPress}
					/>
				</View>
			</View>
		);
	};
	let Confirmation = () => {
		let list = [
			{
				title: strings.carRegisterPlace,
				value: osago.car.carRegisterPlace.name,
			},
			{
				title: strings.availableInsuranceCases,
				value: osago.insuranceCases.availableInsurance.name,
			},
			{
				title: strings.availableViolance,
				value: osago.insuranceCases.haveViolation.name,
			},
			{
				title: strings.availablePrivileges,
				value: osago.privilege.availablePrivilege.name,
			},
			{
				title: strings.insurancePeriod,
				value: osago.insurancePeriod.period.name,
			},
			{
				title: strings.driverCount,
				value: osago.driver.driverCount.name,
			},
			{
				title: strings.deliveryType,
				value: checkout.shipping.withShipping,
			},
			{
				title: strings.policyCost,
				value: Math.round(cost),
			},
		];

		const onPress = () => {
			navigation.navigate(SCREENS.products);
		};
		return (
			<View style={styles.confirmation}>
				<Text style={[styles.bold, styles.textCenter]}>
					{strings.pleaseConfirmYourDataFor + " " + strings.osago}
				</Text>
				<FlatList
					data={list}
					contentContainerStyle={{
						paddingBottom: 60,
					}}
					showsVerticalScrollIndicator={false}
					renderItem={({ item }) => (
						<View
							style={{
								// justifyContent: "space-between",
								flexDirection: "row",
								// alignItems: "center",
							}}
						>
							<View
								style={{
									flex: 1,
									marginVertical: 10,
								}}
							>
								<Text
									style={[
										styles.bigText,
										{
											fontSize: 11,
											textAlign: "left",
										},
									]}
								>
									{item.title}
								</Text>
							</View>
							<View
								style={{
									flex: 1,
									marginVertical: 10,
								}}
							>
								<Text
									style={[
										{
											fontWeight: "bold",
											fontSize: 11,
											textAlign: "right",
										},
									]}
								>
									{item.value}
								</Text>
							</View>
						</View>
					)}
				/>
				<View style={styles.buttonWrapper}>
					<RoundButton
						text={strings.pay}
						gradient
						onPress={onPress}
					/>
				</View>
			</View>
		);
	};

	const [index, setIndex] = useState(0);
	const [routes] = useState([
		{ key: "first", title: strings.documents },
		{ key: "second", title: strings.personalInfo },
		// { key: "third", title: strings.insurancePeriod },
		{ key: "fourth", title: strings.personalInfo },
		{ key: "fifth", title: strings.shipping },
		{ key: "sixth", title: strings.orderConfirmation },
	]);

	const renderScene = SceneMap({
		first: Document,
		second: PersonalInfo,
		// third: InsurancePeriod,
		fourth: LocationInfo,
		fifth: Shipping,
		sixth: Confirmation,
	});

	return (
		<View style={styles.container}>
			<Header
				alignLeft
				close
				title={routes[index].title}
				navigation
				step={[index + 1, 5]}
				navigation={navigation}
			/>
			<TabView
				swipeEnabled={false}
				renderTabBar={() => null}
				navigationState={{ index, routes }}
				renderScene={renderScene}
				onIndexChange={setIndex}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.ultraLightDark,
		flex: 1,
	},
	document: {
		flex: 1,
		paddingHorizontal: CONTAINER_PADDING,
	},
	buttonWrapper: {
		position: "absolute",
		// backgroundColor: colors.white,
		bottom: 0,
		left: 3 * CONTAINER_PADDING,
		right: 3 * CONTAINER_PADDING,
	},
	bold: {
		paddingTop: 20,
		fontSize: 16,
		fontWeight: "bold",
	},
	textCenter: {
		textAlign: "center",
		paddingBottom: 15,
	},
	plusWrapper: {
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 20,
	},
	personal: {
		flex: 1,
	},
	personalContent: {
		paddingHorizontal: CONTAINER_PADDING,
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
	period: {
		padding: CONTAINER_PADDING,
		flex: 1,
	},
	location: {
		flex: 1,
	},
	locationContent: {
		padding: CONTAINER_PADDING,
	},
	shipping: {
		flex: 1,
	},
	shippingContent: {
		paddingHorizontal: CONTAINER_PADDING,
	},
	textArea: {
		borderRadius: BORDER_RADIUS,
		padding: 20,
		paddingVertical: 10,
		margin: 20,
		height: 200,
		backgroundColor: colors.white,
	},
	input: {
		width: deviceWidth * 0.67,
		height: 185,
		textAlignVertical: "top",
	},
	confirmation: {
		flex: 1,
		padding: CONTAINER_PADDING,
	},
});

const mapStateToProps = ({ insurance: { cost, osago }, checkout }) => ({
	osago,
	checkout,
	cost,
});

const mapDispatchToProps = {
	setShippingInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
