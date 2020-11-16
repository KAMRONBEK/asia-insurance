import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import DatePicker from "react-native-datepicker";
import InPageHeader from "../common/InPageHeader";
import { BORDER_RADIUS, colors, Icons, SCREENS } from "../../constants";
import { strings } from "../../locales/strings";
import moment from "moment";
import { navigate } from "../../utils/NavigationService";
import { connect } from "react-redux";
import { setInsurance } from "../../redux/actions";

const PeriodSteps = ({ setInsurance }) => {
	let [beginDate, setBeginDate] = useState(moment(new Date(), "DD.MM.YYYY"));
	let [endDate, setEndDate] = useState(moment(new Date(), "DD.MM.YYYY"));

	let [diffDays, setDiffDays] = useState(0);

	const onNextPress = () => {
		setInsurance({
			parent: "vzr",
			child: "tripDuration",
			data: {
				startDate: beginDate,
				endDate: endDate,
			},
		});
		navigate(SCREENS.calculateCost, {
			name: SCREENS.calculateCost,
			params: {},
		});
	};

	useEffect(() => {
		console.log(
			moment(endDate, "DD.MM.YYYY").diff(
				moment(beginDate, "DD.MM.YYYY"),
				"days"
			)
		);
		setDiffDays(
			moment(endDate, "DD.MM.YYYY").diff(
				moment(beginDate, "DD.MM.YYYY"),
				"days"
			)
		);
	}, [endDate, beginDate]);

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
					minDate={beginDate}
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
						console.log(date);
					}}
				/>
				{diffDays != 0 && (
					<View
						style={{
							alignItems: "center",
						}}
					>
						<Text
							style={{
								color: colors.darkBlue,
								fontWeight: "bold",
								fontSize: 16,
							}}
						>
							{diffDays} {strings.days}
						</Text>
					</View>
				)}
			</View>
			<View
				style={[
					styles.nextWrapper,
					{
						backgroundColor:
							moment(endDate, "DD.MM.YYYY").diff(
								moment(beginDate, "DD.MM.YYYY"),
								"days"
							) > 0
								? colors.lightBlue
								: colors.gray,
					},
				]}
			>
				<TouchableOpacity
					onPress={
						moment(endDate, "DD.MM.YYYY").diff(
							moment(beginDate, "DD.MM.YYYY"),
							"days"
						) > 0
							? onNextPress
							: undefined
					}
				>
					<Text style={styles.next}>{strings.next}</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
	setInsurance,
};

export default connect(mapStateToProps, mapDispatchToProps)(PeriodSteps);

const styles = StyleSheet.create({
	content: {
		flex: 1,
		backgroundColor: colors.ultraLightDark,
		justifyContent: "space-between",
	},
	nextWrapper: {
		alignItems: "flex-end",
		padding: 12,
		paddingVertical: 8,
		borderRadius: 20,
		backgroundColor: colors.lightBlue,
		alignSelf: "flex-end",
		margin: 5,
	},
	next: {
		fontSize: 16,
		fontWeight: "700",
		color: colors.white,
	},
});
