import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { strings } from "../../../locales/strings";
import {
	colors,
	CONTAINER_PADDING,
	deviceWidth,
	SCREENS,
} from "../../../constants";
import Touchable from "../../../components/common/Touchable";
import HelpCard from "../../../components/card/HelpCard";
import { showLoading, hideLoading } from "../../../redux/actions";
import { connect } from "react-redux";
import { requests } from "../../../api/requests";

const helpList = [
	{
		title: "Дмитрий",
		content:
			"Проколол колесо, а запаски нет. Нахожусь около Алтайского рынка, вдоль дороги. Серая BMW,	01 H 570 GB.  Разбалтовка 5х120, диагональ минимум 19 дюймов",
		status: "0",
		time: "17:35",
		date: "09.05.2020",
	},
	{
		onPress: () => {},
		title: "Дмитрий",
		content:
			"Проколол колесо, а запаски нет. Нахожусь около Алтайского рынка, вдоль дороги. Серая BMW,	01 H 570 GB.  Разбалтовка 5х120, диагональ минимум 19 дюймов",
		status: "1",
		time: "17:35",
		date: "09.05.2020",
		buttonText: strings.respondToHelp,
		// buttonTextColor: colors.white,
		// buttonBackColor: colors.darkBlue,
		number: "+998993440423",
	},
	{
		onPress: () => {},
		title: "Дмитрий",
		content:
			"Проколол колесо, а запаски нет. Нахожусь около Алтайского рынка, вдоль дороги. Серая BMW,	01 H 570 GB.  Разбалтовка 5х120, диагональ минимум 19 дюймов",
		status: "1",
		time: "17:35",
		date: "09.05.2020",
		buttonText: strings.respondToHelp,
		// buttonTextColor: colors.darkBlue,
		// buttonBackColor: colors.white,
		// buttonBorderColor: colors.darkBlue,
		number: "+998936893665",
	},
];

const helpedList = [
	{
		title: "Дмитрий",
		content:
			"Проколол колесо, а запаски нет. Нахожусь около Алтайского рынка, вдоль дороги. Серая BMW,	01 H 570 GB.  Разбалтовка 5х120, диагональ минимум 19 дюймов",
		status: "В ожидании",
		time: "17:35",
		date: "09.05.2020",
	},
	{
		onPress: () => {},
		title: "Мой запрос",
		content:
			"Проколол колесо, а запаски нет. Нахожусь около Алтайского рынка, вдоль дороги. Серая BMW,	01 H 570 GB.  Разбалтовка 5х120, диагональ минимум 19 дюймов",
		status: "Помощь найдена",
		time: "17:35",
		date: "09.05.2020",
		buttonText: strings.helpAccepted,
		buttonBackColor: colors.darkBlue,
		buttonTextColor: colors.white,
		helperId: "8293",
	},
];

const Sos = ({ navigation, showLoading, hideLoading }) => {
	let [myRequestsList, setMyRequestList] = useState([]);

	const bootstrap = async () => {
		try {
			let res = await requests.help.myRequests();
			console.log(res.data.data);
			setMyRequestList(res.data.data);
		} catch (error) {
			console.log(error.response);
		} finally {
			hideLoading();
		}
	};

	useEffect(() => {
		showLoading(strings.loadingRequests);
		bootstrap();
	}, []);

	const FirstTab = () => (
		<View style={styles.content}>
			<FlatList
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.cardWrapper}
				data={helpList}
				keyExtractor={(e) => e.toString()}
				renderItem={({ item }) => (
					<HelpCard
						onPress={item.onPress}
						title={item.title}
						content={item.content}
						status={item.status}
						time={item.time}
						date={item.date}
						buttonText={item.buttonText || ""}
						// buttonBackColor={item.buttonBackColor || ""}
						// buttonTextColor={item.buttonTextColor || ""}
						// buttonBorderColor={item.buttonBorderColor || ""}
						number={item.number}
						helperId={item.helperId || ""}
					/>
				)}
			/>
		</View>
	);

	let temp = {
		content: "Sjdisjsjs",
		date: "2020-08-01 23:03:16",
		id: 6,
		lat: "undefined",
		lng: "undefined",
		receiver: null,
		status: 0,
		user: {
			device_token: "test123",
			email: null,
			id: 385,
			name: null,
			phone: "936893665",
			token: "jf2ouzHJGcZTC-fakoIa6W3TxxTMzd9d",
		},
	};

	const SecondTab = () => (
		<View style={styles.content}>
			<FlatList
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.cardWrapper}
				keyExtractor={(e) => e.toString()}
				data={myRequestsList}
				renderItem={({ item }) => (
					<HelpCard
						// onPress={item.onPress}
						id={item.id}
						title={item.content}
						content={item.content}
						status={item.status}
						// time={item.date}
						date={item.date}
						buttonText={strings.helpAccepted || ""}
						buttonBackColor={colors.darkBlue}
						buttonTextColor={colors.white}
					/>
				)}
			/>
		</View>
	);

	const [index, setIndex] = useState(0);
	const [routes] = useState([
		{ key: "first", title: strings.inbox },
		{ key: "second", title: strings.myOutgoingRequests },
	]);
	const renderScene = SceneMap({
		first: FirstTab,
		second: SecondTab,
	});
	const renderTabBar = (props) => (
		<TabBar
			{...props}
			renderLabel={({ route, focused, color }) => (
				<Text style={styles.tabLabelStyle}>{route.title}</Text>
			)}
			tabStyle={{
				width: "auto",
				paddingBottom: 2,
			}}
			indicatorStyle={{
				backgroundColor: colors.red,
			}}
			style={{
				backgroundColor: colors.ultraLightDark,
				elevation: 0,
			}}
		/>
	);
	const onSosPress = () => {
		navigation.navigate(SCREENS.helpRequest);
	};

	return (
		<View style={styles.container}>
			<TabView
				renderTabBar={renderTabBar}
				navigationState={{ index, routes }}
				renderScene={renderScene}
				onIndexChange={setIndex}
				initialLayout={{ width: deviceWidth }}
			/>
			<View style={styles.buttonWrapper}>
				<View style={styles.iconWrapper}>
					<Touchable onPress={onSosPress}>
						<View
							style={{
								justifyContent: "center",
								alignItems: "center",
								backgroundColor: colors.red,
								height: 60,
								width: 60,
							}}
						>
							<Text style={styles.icon}>SOS</Text>
						</View>
					</Touchable>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.ultraLightDark,
		paddingHorizontal: CONTAINER_PADDING,
	},
	content: {
		flex: 1,
	},
	cardWrapper: {
		paddingVertical: 20,
	},
	tabLabelStyle: {
		fontSize: 16,
		fontWeight: "bold",
		color: colors.darkBlueText,
	},
	buttonWrapper: {
		position: "absolute",
		bottom: 10,
		right: CONTAINER_PADDING,
	},
	iconWrapper: {
		borderRadius: 100,
		overflow: "hidden",
	},
	icon: {
		color: colors.white,
		fontSize: 20,
		fontWeight: "bold",
	},
});

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
	showLoading,
	hideLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sos);
