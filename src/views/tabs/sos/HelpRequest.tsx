import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	View,
	TextInput,
	ScrollView,
	Platform,
	PermissionsAndroid,
	TouchableOpacity,
} from "react-native";
import {
	colors,
	Icons,
	BORDER_RADIUS,
	deviceWidth,
	CONTAINER_PADDING,
	SCREENS,
} from "../../../constants";
import { strings } from "../../../locales/strings";
import Text from "../../../components/common/Text";
import RoundButton from "../../../components/common/RoundButton";
import CustomSwitch from "../../../components/common/CustomSwitch";
import Geolocation from "@react-native-community/geolocation";
import { requests } from "../../../api/requests";
import LottieView from "lottie-react-native";
import lotties from "../../../assets/lotties";
import {
	showFlashMessage,
	setMyLocation,
	setHelpLocation,
} from "../../../redux/actions";
import { connect } from "react-redux";
import { navigate } from "../../../utils/NavigationService";

const HelpRequest = ({
	navigation,
	showFlashMessage,
	setMyLocation,
	setHelpLocation,
	mapState,
}) => {
	let [useLocation, setUseLocation] = useState(false);
	let [helpContent, setHelpContent] = useState("");
	// let [location, setLocation] = useState({});

	let [loadingLocation, setLoadingLocation] = useState(false);

	const onMapPress = () => {
		navigation.navigate(SCREENS.map);
	};

	useEffect(() => {
		if (useLocation) {
			setLoadingLocation(true);
			if (Platform.OS === "ios") {
				Geolocation.getCurrentPosition(
					//Will give you the current location
					(position) => {
						console.log(position.coords);
						console.log("coords");

						setHelpLocation(position.coords);
						setLoadingLocation(false);
						showFlashMessage(strings.locationDetermined);
					},
					(error) => {
						setLoadingLocation(false);
						console.log(error.message);
					},
					{
						enableHighAccuracy: false,
						timeout: 20000,
						maximumAge: 1000,
					}
				);
			} else {
				async function requestLocationPermission() {
					try {
						const granted = await PermissionsAndroid.request(
							PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
							{
								title: "Location Access Required",
								message:
									"This App needs to Access your location",
								buttonPositive: "OK",
							}
						);
						if (granted === PermissionsAndroid.RESULTS.GRANTED) {
							//To Check, If Permission is granted
							Geolocation.getCurrentPosition(
								//Will give you the current location
								(position) => {
									console.log(position.coords);
									setHelpLocation(position.coords);
									setLoadingLocation(false);
									showFlashMessage(
										strings.locationDetermined
									);
								},
								(error) => {
									setLoadingLocation(false);
									console.log(error.message);
								},
								{
									enableHighAccuracy: false,
									timeout: 20000,
									maximumAge: 1000,
								}
							);
						} else {
							console.log("Permission Denied");
							setLoadingLocation(false);
							setUseLocation(false);
						}
					} catch (err) {
						console.log("err", err);
						console.warn(err);
						setLoadingLocation(false);
						setUseLocation(false);
					}
				}
				requestLocationPermission();
			}
		}
	}, [useLocation]);

	const onPress = async () => {
		try {
			console.log(mapState.helpLocation, mapState.helpLocation.longitude);
			console.log({
				content: helpContent,
				"location[lng]": mapState.helpLocation.longitude,
				"location[lat]": mapState.helpLocation.latitude,
			});
			let res = await requests.help.requestHelp({
				content: helpContent,
				"location[lng]": mapState.helpLocation.longitude,
				"location[lat]": mapState.helpLocation.latitude,
			});

			showFlashMessage({
				type: colors.green,
				message: strings.requestSent,
			});
			console.log(res.data.data);
		} catch (error) {
			console.log(error.response);
		}
		navigation.navigate(SCREENS.sos);
	};
	return (
		<ScrollView
			style={{ flex: 1, backgroundColor: colors.ultraLightDark }}
			contentContainerStyle={styles.container}
			showsVerticalScrollIndicator={false}
		>
			<Text style={styles.title}>{strings.whatHappenedTellUs}</Text>
			<View style={styles.textArea}>
				<TextInput
					multiline={true}
					placeholder={strings.enterYourRequest}
					style={styles.input}
					onChangeText={(text) => {
						setHelpContent(text);
					}}
				/>
			</View>
			<View style={styles.row}>
				<Text style={styles.bigText}>
					{strings.chooseYourLocationForHelp}
				</Text>
				<CustomSwitch
					value={useLocation}
					onValueChange={setUseLocation}
				/>
			</View>
			<View style={styles.row}>
				<Text style={styles.bigText}>
					{strings.selectLocationManually}
				</Text>
				<TouchableOpacity onPressIn={onMapPress}>
					<View style={styles.iconWrapper}>
						<Icons name="flag" size={25} color={colors.darkBlue} />
					</View>
				</TouchableOpacity>
			</View>
			<View style={styles.buttonWrapper}>
				<RoundButton
					text={strings.sendRequest}
					gradient
					onPress={onPress}
					passive={helpContent.length <= 5 || loadingLocation}
				/>
			</View>
			{/* {loadingLocation && (
				<View style={styles.loading}>
					<LottieView
						source={lotties.locating}
						// resizeMode="cover"
						style={{
							height: 100,
							width: 100,
							padding: 0,
							marginBottom: 15,
						}}
						autoPlay
						loop
					/>
				</View>
			)} */}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {},
	title: {
		marginTop: 30,
		textAlign: "center",
		fontSize: 16,
		fontWeight: "bold",
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
	textArea: {
		borderRadius: BORDER_RADIUS,
		padding: 20,
		paddingVertical: 10,
		margin: 20,
		height: 140,
		backgroundColor: colors.white,
	},
	input: {
		width: deviceWidth * 0.67,
		height: 240,
		textAlignVertical: "top",
	},
	iconWrapper: {
		borderWidth: 0.5,
		borderColor: colors.gray,
		padding: 10,
		paddingRight: 15,
		borderRadius: 10,
	},
	bigText: {
		maxWidth: deviceWidth - 100,
	},
	buttonWrapper: {
		paddingHorizontal: CONTAINER_PADDING * 3,
		paddingBottom: 20,
	},
	loading: {
		position: "absolute",
		top: 60,
		right: 0,
		left: 200,
		bottom: 0,
		justifyContent: "center",
		alignItems: "center",
	},
});
const mapStateToProps = ({ mapState }) => ({
	mapState,
});

const mapDispatchToProps = {
	showFlashMessage,
	setMyLocation,
	setHelpLocation,
};

export default connect(mapStateToProps, mapDispatchToProps)(HelpRequest);
