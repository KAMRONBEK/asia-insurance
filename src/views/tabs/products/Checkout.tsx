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
import {
	setShippingInfo,
	setDocuments,
	setLocationInfo,
	showFlashMessage,
	setInsurancePeriod,
	showLoading,
	hideLoading,
	setWithShipping,
	setShippingSameAddr,
} from "../../../redux/actions";
import { requests } from "../../../api/requests";
import moment from "moment";
import DatePicker from "react-native-datepicker";
import { navigate } from "../../../utils/NavigationService";
import DateInput from "../../../components/common/DateInput";

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

const Checkout = ({
	navigation,
	osago,
	checkout,
	setShippingInfo,
	cost,
	setDocuments,
	user,
	setLocationInfo,
	showFlashMessage,
	setInsurancePeriod,
	showLoading,
	hideLoading,
	setWithShipping,
	setShippingSameAddr,
}) => {
	//checkout datas goes here
	let driverLimited = osago?.driver?.driverCount?.value == "limited";

	// let [oblastId, setOblastId] = useState(0);
	// let [rayonId, setRayonId] = useState(0);

	// let endDate = beginDate.setDate(
	// 	beginDate.getDate() + osago.insurancePeriod.period.days
	// );

	let Document = () => {
		let [driversDocuments, setDriversDocuments] = useState([]);
		let [driverDocumentList, setDriverDocumentList] = useState([]);

		useEffect(() => {
			// console.log(driversDocuments);
		}, [driversDocuments]);

		const onPress = () => {
			console.log("nextpress");

			setDocuments(driversDocuments);
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
						docType={1}
					/>
					<ImageUploadCard
						name={strings.ownerPassport}
						data={driversDocuments}
						setData={setDriversDocuments}
						docType={2}
					/>
					<ImageUploadCard
						name={strings.techPassport}
						data={driversDocuments}
						setData={setDriversDocuments}
						docType={3}
					/>

					{/* check for pension */}
					{osago.privilege.availablePrivilege.name !==
						"БЕЗ ЛЬГОТ" && (
						<ImageUploadCard
							name={osago.privilege.availablePrivilege.name}
							data={driversDocuments}
							setData={setDriversDocuments}
							docType={8}
						/>
					)}
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
								docType={5}
							/>
							<ImageUploadCard
								name={driver.second}
								data={driversDocuments}
								setData={setDriversDocuments}
								docType={4}
							/>
							<ImageUploadCard
								name={driver.third}
								data={driversDocuments}
								setData={setDriversDocuments}
								docType={6}
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
						{/* <Input placeholder={strings.pinfl} setValue={setPin} /> */}
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
						passive={!name || !lastName || !middleName}
					/>
				</View>
			</View>
		);
	};
	let InsurancePeriod = () => {
		let [beginDate, setBeginDate] = useState(
			moment(new Date(), "DD.MM.YYYY").format("DD.MM.YYYY")
		);
		// moment(new Date(), "DD.MM.YYYY")
		let [endDate, setEndDate] = useState(
			moment(beginDate, "DD.MM.YYYY")
				.add(osago.insurancePeriod.period.days, "days")
				.format("DD.MM.YYYY")
		);
		// moment(beginDate, "DD.MM.YYYY")
		// 	.add(osago.insurancePeriod.period.days, "days")
		// 	.format("DD.MM.YYYY")
		const onPress = () => {
			setInsurancePeriod({ beginDate: beginDate, endDate: endDate });

			setIndex(index + 1);
		};
		useEffect(() => {
			setEndDate(
				moment(beginDate, "DD.MM.YYYY")
					.add(osago.insurancePeriod.period.days, "days")
					.format("DD.MM.YYYY")
			);

			console.log(
				beginDate,
				moment(beginDate, "DD.MM.YYYY")
					.add(osago.insurancePeriod.period.days, "days")
					.format("DD.MM.YYYY"),
				osago.insurancePeriod.period.days
			);
		}, [beginDate]);

		return (
			<View style={styles.period}>
				{/* <Select
					placeholder={strings.chooseInsurancePeriod}
					options={[{ label: "label", value: "value" }]}
				/>
				<Select
					placeholder={strings.realisationDate}
					options={[{ label: "label", value: "value" }]}
				/> */}
				<DateInput
					value={beginDate}
					setValue={setBeginDate}
					placeholder={strings.pickStartDate}
				/>
				<DateInput
					value={endDate}
					setValue={setBeginDate}
					passive
					placeholder={strings.pickEndDate}
				/>
				{/* <DatePicker
					style={{
						borderRadius: BORDER_RADIUS,
						backgroundColor: colors.white,
						justifyContent: "space-between",
						width: "100%",
						padding: 10,
						marginBottom: 20,
					}}
					date={beginDate}
					mode="date"
					placeholder={strings.pickStartDate}
					format="DD.MM.YYYY"
					minDate={new Date()}
					maxDate="01-01-2030"
					confirmBtnText={strings.yes}
					cancelBtnText={strings.no}
					iconComponent={
						<Icons name="calendar" size={20} color={colors.gray} />
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
						setBeginDate(date);
					}}
				/>
				<DatePicker
					style={{
						borderRadius: BORDER_RADIUS,
						backgroundColor: colors.white,
						justifyContent: "space-between",
						width: "100%",
						padding: 10,
					}}
					date={endDate}
					disabled
					mode="date"
					placeholder={strings.pickEndDate}
					format="DD.MM.YYYY"
					minDate={new Date()}
					maxDate="01-01-2030"
					confirmBtnText={strings.yes}
					cancelBtnText={strings.no}
					iconComponent={
						<Icons name="calendar" size={20} color={colors.gray} />
					}
					customStyles={{
						dateIcon: {
							height: 30,
							width: 30,
						},
						dateInput: {
							borderWidth: 0,
							borderRadius: BORDER_RADIUS,
							marginRight: 20,
						},
						dateTouchBody: {
							width: "100%",
							justifyContent: "space-between",
							overflow: "hidden",
							paddingRight: 10,
						},
						disabled: {
							backgroundColor: colors.ultraLightDark,
						},
						// ... You can check the source to find the other keys.
					}}
					onDateChange={(date) => {
						setEndDate(date);
					}}
				/> */}
				<View style={styles.buttonWrapper}>
					<RoundButton
						text={strings.next}
						gradient
						onPress={onPress}
						passive={!beginDate || !endDate}
					/>
				</View>
			</View>
		);
	};
	let LocationInfo = () => {
		let [countryList, setCountryList] = useState([]);
		let [oblastList, setOblastList] = useState([]);
		let [rayonList, setRayonList] = useState([]);

		let [country, setCountry] = useState({});
		let [region, setRegion] = useState({});
		let [district, setDistrict] = useState({});
		let [street, setStreet] = useState("");
		let [house, setHouse] = useState("");
		let [phone, setPhone] = useState("");

		let getCountryList = async () => {
			showLoading(strings.loadingCountries);
			try {
				let res = await requests.dictionary.getCountryList();
				// console.warn(res.data.length);
				let temp = res.data.map((country) => {
					return {
						label: country.text,
						value: {
							text: country.text,
							id: country.id,
						},
					};
				});
				console.warn(temp.length, "countries");
				setCountryList(temp);
			} catch (error) {
				console.log(error);
				showFlashMessage({ type: colors.red, message: error });
			} finally {
				hideLoading();
			}
		};

		let getOblastList = async () => {
			showLoading(strings.loadingRegions);
			try {
				let res = await requests.dictionary.getRegionList();
				// console.warn(res.data.length);
				let temp = res.data.map((region) => {
					return {
						label: region.text,
						value: {
							text: region.text,
							id: region.id,
						},
					};
				});
				console.warn(temp.length, "oblasts");
				setOblastList(temp);
			} catch (error) {
				console.log(error);
				showFlashMessage({ type: colors.red, message: error });
			} finally {
				hideLoading();
			}
		};

		let getRayonList = async (id) => {
			showLoading(strings.loadingRayons);
			try {
				console.log(id, "load rayon");
				let res = await requests.dictionary.getRayonList();
				console.log(res.data.length, "ta rayon");
				let correspondingRayons = res.data.filter((rayon) => {
					if (rayon.regionId === id) {
						return rayon;
					}
				});
				let temp = correspondingRayons.map((rayon) => {
					return {
						label: rayon?.text,
						value: {
							text: rayon?.text,
							regionId: rayon?.regionId,
							id: rayon?.id,
						},
					};
				});
				console.log(temp.length, "rayon");

				setRayonList(temp);
			} catch (error) {
				showFlashMessage({ type: colors.red, message: error });
				console.log(error);
			} finally {
				hideLoading();
			}
		};

		// useEffect(() => {
		// 	console.log("region change");
		// 	if (region && index == 3) {
		// 	}
		// }, [region]);

		useEffect(() => {
			if (index == 3) {
				getCountryList();
				getOblastList();
			}
		}, [index]);

		const onRegionSelected = () => {};

		const onPress = () => {
			setLocationInfo({
				country: country,
				region: region,
				district: district,
				street: street,
				house: house,
				phone: phone,
			});
			setIndex(index + 1);
		};

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
							options={countryList}
							selectValue={setCountry}
							preValue={{
								label: "УЗБЕКИСТАН",
								value: { id: 184, text: "УЗБЕКИСТАН" },
							}}
							passive
						/>
						<Select
							selectValue={setRegion}
							onValueChange={getRayonList}
							placeholder={strings.region}
							options={oblastList}
						/>
						<Select
							selectValue={setDistrict}
							placeholder={strings.district}
							options={rayonList}
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
		// let [withShipping, setWithShipping] = useState(false);
		let [isShippingAddrSame, setIsShippingAddrSame] = useState(false);

		const onPress = () => {
			setIndex(index + 1);
			// setShippingInfo({
			// 	withShipping: checkout.shipping.withShipping
			// 		? strings.shipping
			// 		: strings.takeFromOffice,
			// });
		};

		useEffect(() => {
			console.log(checkout.shipping.withShipping);
		}, [checkout.shipping.withShipping]);

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
							onPress={setWithShipping}
							selected={checkout.shipping.withShipping}
						/>
						<PlainText
							radio
							item={{ name: strings.takeFromOffice }}
							onPress={setWithShipping}
							selected={!checkout.shipping.withShipping}
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
							value={isShippingAddrSame}
							onValueChange={setIsShippingAddrSame}
						/>
					</View>
					{checkout.shipping.withShipping && (
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
			// {
			// 	title: strings.availableViolance,
			// 	value: osago.insuranceCases.haveViolation.name,
			// },
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
				value: checkout.shipping.withShipping
					? strings.shippingToDoor
					: strings.takeFromOffice,
			},
			{
				title: strings.policyCost,
				value: Math.round(cost),
			},
		];

		const onPress = async () => {
			showLoading(strings.registeringYourOrder);

			try {
				console.log({
					CustomerId: user.customerId,
					ContactPhone: user.user.phone,
					InsuranceType: 0,
					DeliveryOblastId: checkout.locationInfo.region.id,
					DeliveryRayonId: checkout.locationInfo.district.id,
					InsuranceParams: {
						Premia:
							(Math.ceil(cost / 100) * 100) /
							osago.privilege.availablePrivilege.tariff,
						InsuranceSumm: 40000000,
						Discount:
							Math.round(cost) /
								osago.privilege.availablePrivilege.tariff -
							Math.round(cost),
						BeginDate: checkout.insurancePeriod.beginDate,
						EndDate: checkout.insurancePeriod.endDate,
						ExtraData: JSON.stringify(osago),
					},
					// DocsInBytes: checkout.documents,
				});

				let res = await requests.order.createOrder({
					CustomerId: user.customerId,
					ContactPhone: user.user.phone,
					InsuranceType: 0, //OSAGO
					DeliveryOblastId: checkout.locationInfo.region.id,
					DeliveryRayonId: checkout.locationInfo.district.id,
					InsuranceParams: {
						Premia:
							(Math.ceil(cost / 100) * 100) /
							osago.privilege.availablePrivilege.tariff,
						InsuranceSumm: 40000000,
						Discount:
							Math.round(cost) /
								osago.privilege.availablePrivilege.tariff -
							Math.round(cost),
						BeginDate: checkout.insurancePeriod.beginDate,
						EndDate: checkout.insurancePeriod.endDate,
						ExtraData: JSON.stringify(osago),
					},
					// Docs: checkout.documents,
					// Docs: [],
					DocsInBytes: checkout.documents,
				});

				console.log(res.data);

				try {
					let orderConfirmRespose = await requests.orderConfirm.confirmOrder(
						{
							type: "osgo",
							order_number: res.data.orderNumber,
							order_id: res.data.orderId,
							price: Math.ceil(cost / 100) * 100,
							discount: 0,
						}
					);

					console.log(orderConfirmRespose.data.data);

					showFlashMessage({
						type: colors.green,
						message:
							strings.yourOrderAccepted +
							"\n" +
							strings.orderId +
							res.data.orderId,
					});
					// navigation.navigate(SCREENS.products);
					navigate(SCREENS.tabs, {
						name: SCREENS.historyStack,
						params: {
							screen: SCREENS.payments,
							params: {
								paymentData: orderConfirmRespose.data.data,
							},
						},
					});
				} catch (error) {
					console.log(error.request._response, "raul");
				}
			} catch (error) {
				console.log(error.request._response, "checkout");
				showFlashMessage({
					type: colors.red,
					message: error.request._response.toString(),
				});
			} finally {
				hideLoading();
			}
		};

		let temp = {
			config: {
				data:
					'{"CustomerId":"600a723f-c121-4d72-bf5a-ba6f67433601","ContactPhone":"993440423","InsuranceType":0,"DeliveryOblastId":15,"DeliveryRayonId":1508,"InsuranceParams":{"Premia":38400,"InsuranceSumm":40000000,"Discount":0,"BeginDate":"13.08.2020","EndDate":"13.08.2020"},"Docs":[{"DocumentTypeEnum":1,"File":{"_parts":[["uri","file:///data/user/0/com.asia_insurance/cache/react-native-image-crop-picker/IMG_20200806_171618_668.jpg"],["name","upload_photo"],["type","image/jpeg"]]}},{"DocumentTypeEnum":2,"File":{"_parts":[["uri","file:///data/user/0/com.asia_insurance/cache/react-native-image-crop-picker/IMG_20200806_171618_668.jpg"],["name","upload_photo"],["type","image/jpeg"]]}},{"DocumentTypeEnum":3,"File":{"_parts":[["uri","file:///data/user/0/com.asia_insurance/cache/react-native-image-crop-picker/IMG_20200806_171618_668.jpg"],["name","upload_photo"],["type","image/jpeg"]]}}]}',
				headers: {
					Accept: "application/json, text/plain, */*",
					"Content-Type": "application/json",
				},
				maxContentLength: -1,
				method: "post",
				timeout: 0,
				url: "http://81.95.229.2:5000/api/Order/CreateOrder",
				validateStatus: "[Function validateStatus]",
				xsrfCookieName: "XSRF-TOKEN",
				xsrfHeaderName: "X-XSRF-TOKEN",
			},
			data: {
				errors: {
					"Docs[0].File._parts": [Array],
					"Docs[1].File._parts": [Array],
					"Docs[2].File._parts": [Array],
				},
				status: 400,
				title: "One or more validation errors occurred.",
				traceId: "80000069-0005-ff00-b63f-84710c7967bb",
			},
			headers: {
				"content-length": "775",
				"content-type": "application/problem+json; charset=utf-8",
				date: "Wed, 12 Aug 2020 21:11:54 GMT",
				server: "Microsoft-IIS/10.0",
				"x-powered-by": "ASP.NET",
			},
			request: {
				DONE: 4,
				HEADERS_RECEIVED: 2,
				LOADING: 3,
				OPENED: 1,
				UNSENT: 0,
				_aborted: false,
				_cachedResponse: undefined,
				_hasError: false,
				_headers: {
					accept: "application/json, text/plain, */*",
					"content-type": "application/json",
				},
				_incrementalEvents: false,
				_lowerCaseResponseHeaders: {
					"content-length": "775",
					"content-type": "application/problem+json; charset=utf-8",
					date: "Wed, 12 Aug 2020 21:11:54 GMT",
					server: "Microsoft-IIS/10.0",
					"x-powered-by": "ASP.NET",
				},
				_method: "POST",
				_requestId: null,
				_response:
					'{"errors":{"Docs[0].File._parts":["Could not create an instance of type Microsoft.AspNetCore.Http.IFormFile. Type is an interface or abstract class and cannot be instantiated. Path \'Docs[0].File._parts\', line 1, position 311."],"Docs[1].File._parts":["Could not create an instance of type Microsoft.AspNetCore.Http.IFormFile. Type is an interface or abstract class and cannot be instantiated. Path \'Docs[1].File._parts\', line 1, position 514."],"Docs[2].File._parts":["Could not create an instance of type Microsoft.AspNetCore.Http.IFormFile. Type is an interface or abstract class and cannot be instantiated. Path \'Docs[2].File._parts\', line 1, position 717."]},"title":"One or more validation errors occurred.","status":400,"traceId":"80000069-0005-ff00-b63f-84710c7967bb"}',
				_responseType: "",
				_sent: true,
				_subscriptions: [],
				_timedOut: false,
				_trackingName: "unknown",
				_url: "http://81.95.229.2:5000/api/Order/CreateOrder",
				readyState: 4,
				responseHeaders: {
					"Content-Length": "775",
					"Content-Type": "application/problem+json; charset=utf-8",
					Date: "Wed, 12 Aug 2020 21:11:54 GMT",
					Server: "Microsoft-IIS/10.0",
					"X-Powered-By": "ASP.NET",
				},
				responseURL: "http://81.95.229.2:5000/api/Order/CreateOrder",
				status: 400,
				timeout: 0,
				upload: {},
				withCredentials: true,
			},
			status: 400,
			statusText: undefined,
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
						// onPressIn={() =>
						// }
					/>
				</View>
			</View>
		);
	};

	const [index, setIndex] = useState(0);
	const [routes] = useState([
		{ key: "first", title: strings.documents },
		{ key: "second", title: strings.personalInfo },
		{ key: "third", title: strings.insurancePeriod },
		{ key: "fourth", title: strings.personalInfo },
		{ key: "fifth", title: strings.shipping },
		{ key: "sixth", title: strings.orderConfirmation },
	]);

	const renderScene = SceneMap({
		first: Document,
		second: PersonalInfo,
		third: InsurancePeriod,
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
				step={[index + 1, 6]}
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
		backgroundColor: colors.ultraLightBlue,
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

const mapStateToProps = ({ user, insurance, checkout }) => ({
	osago: insurance.osago,
	checkout,
	cost: insurance.cost,
	user,
});

const mapDispatchToProps = {
	setShippingInfo,
	setDocuments,
	setLocationInfo,
	showFlashMessage,
	setInsurancePeriod,
	showLoading,
	hideLoading,
	setWithShipping,
	setShippingSameAddr,
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
