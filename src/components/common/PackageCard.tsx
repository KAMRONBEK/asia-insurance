import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Touchable from "./Touchable";
import {
	colors,
	CONTAINER_PADDING,
	deviceWidth,
	BORDER_RADIUS,
} from "../../constants";
import { showModal } from "../../redux/actions";
import { connect } from "react-redux";

const PackageCard = ({ item, onPress, selected, showModal }) => {
	let [checked, setChecked] = useState(
		item.selected ? item.selected : selected
	);
	const onRadioPress = () => {
		setChecked(!checked);
	};
	return (
		<Touchable
			onPress={() => {
				onPress();
				onRadioPress();
			}}
		>
			<View style={styles.container}>
				<View style={styles.column}>
					<Text style={styles.title}>{item.name}</Text>
					<View style={styles.row}>
						<Text style={styles.price}>{item.name}</Text>
						<View style={{}}>
							<TouchableOpacity
								onPress={() => {
									showModal();
								}}
							>
								<Text style={styles.link}>{item.name}</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
				<View style={styles.radio}>
					<View
						style={[
							styles.radioIcon,
							!!checked && {
								backgroundColor: colors.red,
							},
						]}
					/>
				</View>
			</View>
		</Touchable>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		marginHorizontal: CONTAINER_PADDING,
		padding: 20,
		paddingHorizontal: 30,
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
		backgroundColor: colors.white,
		borderRadius: BORDER_RADIUS,
	},
	column: {
		flex: 1,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	title: {
		fontSize: 18,
		fontWeight: "100",
	},
	price: {
		fontWeight: "700",
		fontSize: 28,
		width: deviceWidth * 0.45,
	},
	link: {
		width: deviceWidth * 0.25,
		textDecorationLine: "underline",
		color: colors.lightBlue,
		paddingRight: 10,
	},
	radio: {
		height: 15,
		borderRadius: 15,
		width: 15,
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 1,
	},
	radioIcon: {
		height: 7,
		width: 7,
		borderRadius: 7,
		backgroundColor: colors.gray,
	},
});

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
	showModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(PackageCard);
