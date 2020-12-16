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
import { strings } from "../../locales/strings";
import { requests } from "../../api/requests";
import Modal from "../container/Modal";

const PackageCard = ({ item, onPress, selected, showModal, modalChild }) => {
	let [checked, setChecked] = useState(
		item.selected ? item.selected : selected
	);

	const onRadioPress = () => {
		setChecked(!checked);
	};

	const onDetailPress = async () => {
		console.log(item.insuranceProgramId);
		try {
			let res = await requests.travel.programService(
				item.insuranceProgramId
			);
			console.log(res.data.data);
			showModal(res.data.data);
		} catch (error) {
			console.log(error.response, "error");
		}
	};

	return (
		<>
			<TouchableOpacity
				onPress={() => {
					onPress();
					onRadioPress();
				}}
			>
				<View style={styles.container}>
					<View style={styles.column}>
						<Text style={styles.title}>
							{item.insuranceProgramName}
						</Text>
						<View style={styles.row}>
							<Text style={styles.price}>
								{item.insuranceSummValue} {item.currencyCode}
							</Text>
							<View style={{}}>
								<TouchableOpacity onPress={onDetailPress}>
									<Text style={styles.link}>
										{strings.tarifDetails}
									</Text>
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
			</TouchableOpacity>
		</>
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

const mapStateToProps = ({ appState }) => ({
	modalChild: appState.modalChild,
});

const mapDispatchToProps = {
	showModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(PackageCard);
