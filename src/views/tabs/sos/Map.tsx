import React, { useState, useEffect, useRef } from "react";
import {
	StyleSheet,
	Text,
	View,
	Platform,
	PermissionsAndroid,
	TouchableOpacity,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps"; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from "@react-native-community/geolocation";
import {
	showFlashMessage,
	setMyLocation,
	showLoading,
	hideLoading,
	setHelpLocation,
} from "../../../redux/actions";
import { connect } from "react-redux";
import { strings } from "../../../locales/strings";
import {
	LATITUDE_DELTA,
	LONGITUDE_DELTA,
	BORDER_RADIUS,
	colors,
	SCREENS,
} from "../../../constants";
import { isEmpty } from "../../../utils/functions";

const Map = ({
	mapState,
	setMyLocation,
	showFlashMessage,
	showLoading,
	hideLoading,
	setHelpLocation,
	navigation,
	route,
}) => {
	let [marginBottom, setMarginBottom] = useState(1);

	const _map = useRef<MapView>(null);

	// console.log(route.params);

	// let { latitude, longitude } = route.params;

	useEffect(() => {
		showLoading(strings.loadingMap);
		if (Platform.OS === "ios") {
			// this.callLocation(that);
		} else {
			async function requestLocationPermission() {
				try {
					const granted = await PermissionsAndroid.request(
						PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
						{
							title: "Location Access Required",
							message: "This App needs to Access your location",
							buttonPositive: "OK",
						}
					);
					if (granted === PermissionsAndroid.RESULTS.GRANTED) {
						//To Check, If Permission is granted
						Geolocation.getCurrentPosition(
							//Will give you the current location
							(position) => {
								console.log(position.coords, "my location");
								setMyLocation({
									...position.coords,
									latitudeDelta: LATITUDE_DELTA,
									longitudeDelta: LONGITUDE_DELTA,
								});
								if (_map.current) {
									_map.current.animateToRegion(
										{
											...position.coords,
											latitudeDelta: LATITUDE_DELTA,
											longitudeDelta: LONGITUDE_DELTA,
										},
										500
									);
								}
								hideLoading();

								// if (!!latitude && !!longitude) {
								// 	if (_map.current) {
								// 		_map.current.animateToRegion(
								// 			{
								// 				latitude: parseFloat(latitude),
								// 				longitude: parseFloat(
								// 					longitude
								// 				),
								// 				latitudeDelta: LATITUDE_DELTA,
								// 				longitudeDelta: LONGITUDE_DELTA,
								// 			},
								// 			500
								// 		);
								// 	}
								// }
							},
							(error) => {
								console.log(error.message);
							},
							{
								enableHighAccuracy: false,
								timeout: 20000,
								maximumAge: 1000,
							}
						);
					} else {
						showFlashMessage("Permission Denied");
						console.log("Permission Denied");
						navigation.goBack();
					}
				} catch (err) {
					console.log("err", err);
					showFlashMessage(strings.locationDetermined);
					console.warn(err);
				}
			}
			requestLocationPermission();
		}
	}, []);

	return (
		<View
			style={[
				styles.container,
				{
					marginBottom: marginBottom,
				},
			]}
		>
			<MapView
				ref={_map}
				showsMyLocationButton={true}
				showsTraffic={true}
				showsUserLocation={true}
				provider={PROVIDER_GOOGLE} // remove if not using Google Maps
				style={styles.map}
				region={mapState.myLocation}
				onMapReady={() => {
					setMarginBottom(0);
				}}
				onLongPress={({ nativeEvent }) => {
					setHelpLocation({
						...nativeEvent.coordinate,
						latitudeDelta: LATITUDE_DELTA,
						longitudeDelta: LONGITUDE_DELTA,
					});
					console.log(mapState);
				}}
			>
				{!isEmpty(mapState.helpLocation) && (
					<Marker
						coordinate={{
							latitude: mapState.helpLocation.latitude,
							longitude: mapState.helpLocation.longitude,
						}}
					/>
				)}
				{/* {!!latitude && !!longitude && (
					<Marker
						coordinate={{
							latitude: parseFloat(latitude),
							longitude: parseFloat(longitude),
						}}
					/>
				)} */}
			</MapView>
			<View style={{}}>
				{!isEmpty(mapState.helpLocation) && (
					<TouchableOpacity
						onPress={() => {
							navigation.navigate(SCREENS.helpRequest);
						}}
					>
						<View
							style={{
								borderRadius: 40,
								padding: 15,
								marginTop: 5,
								backgroundColor: colors.white,
							}}
						>
							<Text
								style={{
									fontSize: 16,
								}}
							>
								{strings.selectPlace}
							</Text>
						</View>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		justifyContent: "flex-start",
		alignItems: "center",
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
});

const mapStateToProps = ({ mapState }) => ({ mapState });

const mapDispatchToProps = {
	setMyLocation,
	showFlashMessage,
	showLoading,
	hideLoading,
	setHelpLocation,
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
