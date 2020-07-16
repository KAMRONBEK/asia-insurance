import React, { useState } from "react";
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
import { TouchableOpacity } from "react-native-gesture-handler";

const Checkout = ({ navigation }) => {
	//checkout datas goes here

	let [sameAddress, setSameAddress] = useState(false);
	let [withShipping, setWithShipping] = useState(false);

	let onAddPress = () => {};

	let Document = () => {
		const onPress = () => {
			setIndex(index + 1);
		};
		return (
			<View style={styles.document}>
				<ScrollView
					contentContainerStyle={{
						paddingBottom: 80,
					}}
					showsVerticalScrollIndicator={false}
					style={{}}
				>
					<ImageUploadCard name={strings.applicantsPassport} />
					<ImageUploadCard name={strings.ownerPassport} />
					<ImageUploadCard name={strings.techPassport} />
					<Text style={styles.bold}>{strings.driver + "1"}</Text>
					<ImageUploadCard name={strings.applicantsPassport} />
					<ImageUploadCard name={strings.applicantsPassport} />
					<ImageUploadCard name={strings.applicantsPassport} />
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
	let PersonalInfo = () => {
		let [isOwner, setIsOwner] = useState(false);
		let [isDriver, setIsDriver] = useState(false);

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
						<Input placeholder={strings.pinfl} />
						<Input placeholder={strings.lastName} />
						<Input placeholder={strings.firstName} />
						<Input placeholder={strings.midName} />
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
					/>
				</View>
			</View>
		);
	};
	let InsurancePeriod = () => {
		const onPress = () => {
			setIndex(index + 1);
		};
		return (
			<View style={styles.period}>
				<Select
					placeholder={strings.chooseInsurancePeriod}
					options={[{ label: "label", value: "value" }]}
				/>
				<Select
					placeholder={strings.realisationDate}
					options={[{ label: "label", value: "value" }]}
				/>
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
	let LocationInfo = () => {
		const onPress = () => {
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
							options={[{ label: "label", value: "value" }]}
						/>
						<Select
							placeholder={strings.region}
							options={[{ label: "label", value: "value" }]}
						/>
						<Select
							placeholder={strings.district}
							options={[{ label: "label", value: "value" }]}
						/>
						<Input placeholder={strings.street} />
						<Input placeholder={strings.house} />
						<Input placeholder={strings.phone} />
					</View>
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
	let Shipping = () => {
		const onPress = () => {
			setIndex(index + 1);
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
								if (!withShipping) {
									console.warn(withShipping);
									setWithShipping(true);
								}
							}}
							selected={withShipping}
						/>
						<PlainText
							radio
							item={{ name: strings.takeFromOffice }}
							onPress={() => {
								if (withShipping) {
									setWithShipping(false);
								}
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
		const onPress = () => {
			navigation.navigate(SCREENS.products);
		};
		return (
			<View style={styles.confirmation}>
				<Text style={[styles.bold, styles.textCenter]}>
					{strings.pleaseConfirmYourDataFor + " " + strings.osago}
				</Text>
				<Text>{strings.somethingWentWrong}</Text>
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
				// swipeEnabled={false}
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
export default Checkout;
