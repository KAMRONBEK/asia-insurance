import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import DatePicker from "react-native-datepicker";
import InPageHeader from "../common/InPageHeader";
import { BORDER_RADIUS, colors, Icons, SCREENS } from "../../constants";
import { strings } from "../../locales/strings";
import moment from "moment";
import { navigate } from "../../utils/NavigationService";

const PeriodSteps = () => {
	let [beginDate, setBeginDate] = useState(moment(new Date(), "DD.MM.YYYY"));
	let [endDate, setEndDate] = useState(moment(new Date(), "DD.MM.YYYY"));

	const onNextPress = () => {
		navigate(SCREENS.calculateCost, {
			name: SCREENS.calculateCost,
			params: {},
		});
	};
	return (
		<View style={styles.content}>
			<View>
				<InPageHeader title={strings.enterTripDate} />
				<DatePicker
					style={{
						borderRadius: BORDER_RADIUS,
						backgroundColor: colors.white,
						justifyContent: "space-between",
						width: "100%",
						padding: 10,
						marginBottom: 20,
						marginTop: 10,
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
						marginBottom: 20,
					}}
					date={endDate}
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
						setEndDate(date);
					}}
				/>
			</View>
			<View style={styles.nextWrapper}>
				<TouchableOpacity onPress={onNextPress}>
					<Text style={styles.next}>{strings.next}</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default PeriodSteps;

const styles = StyleSheet.create({
	content: {
		flex: 1,
		backgroundColor: colors.ultraLightDark,
		justifyContent: "space-between",
	},
	nextWrapper: {
		alignItems: "flex-end",
		padding: 20,
	},
	next: {
		fontSize: 16,
		fontWeight: "700",
	},
});
