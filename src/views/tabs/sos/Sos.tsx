import React, { useState, useEffect, useCallback } from "react";
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
import { useFocusEffect } from "@react-navigation/native";

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

const Sos = ({ navigation, showLoading, hideLoading, counter }) => {
	let [myRequestsList, setMyRequestList] = useState([]);
	let [allRequestsList, setAllRequestsList] = useState([]);

	const bootstrap = async () => {
		try {
			let myResult = await requests.help.myRequests();
			let allResult = await requests.help.allRequests();
			console.log(myResult.data.data, "my");
			console.log(allResult.data.data.length, "all");
			setMyRequestList(myResult.data.data);
			setAllRequestsList(allResult.data.data);
		} catch (error) {
			console.log(error.response);
		} finally {
			hideLoading();
		}
	};

	useEffect(() => {
		showLoading(strings.loadingRequests);
		bootstrap();
	}, [counter]);

	useEffect(() => {
		const unsubscribe = navigation.addListener("focus", () => {
			console.log("Screen is focused");
			showLoading(strings.loadingRequests);
			bootstrap();
		});

		return unsubscribe;
	}, []);

	// useFocusEffect(() => {
	// 	const unsubscribe = () => bootstrap();
	// 	console.log("focus");
	// 	return () => unsubscribe();
	// });
	let temp = [
		{
			content: "Kamron Nujen pomosh, toplivo!",
			date: "2020-09-14 15:00:44",
			id: 12,
			lat: "undefined",
			lng: "undefined",
			receiver: {
				device_token:
					"d_kVKRY-SnOBdgb5puDRDk:APA91bEp1DzNodN8ny4ojnbzs7Ock4lbDP5nfLjoQHpZzfE5Awnlv1YSOrnNFJrynRit58ywpAARocYXW27w6jaoXFJbFZc0Ly8qBKWaUtUb22iM-SzdJio5w684kpZGNQX06ydE0J0R",
				email: null,
				id: 397,
				name: null,
				phone: "909770502",
				points: 1000,
				token: "3JC43iFbJjef0zUDm0rVhFa2FbtfZ1Jb",
			},
			status: 2,
			title: null,
			user: {
				device_token:
					"cLENH3OVQs-B0cH0pysLlo:APA91bE9KpwW13LN07xwNiC2J-ehi0NU_vnAJQ0z-DwoGzzyW0qD4ca1EZoYtCqWnH8VsjmusGijr3B5MZp6hGPIQ-EozuKPLulE-xWMHbK0I3h5Q2t2g5ngy4OQixIgNYz1Fi0lUuAd",
				email: null,
				id: 385,
				name: null,
				phone: "936893665",
				points: 2000,
				token: "Ge8TP1daKQxlOyBVQt6ch0TK-6qEjMBi",
			},
		},
	];

	const onAccept = async (item) => {
		showLoading(strings.acceptingRequest);
		try {
			let res = await requests.help.acceptRequest({ id: item.id });
			if (res) {
				bootstrap();
			}
		} catch (error) {
		} finally {
			hideLoading();
		}
	};

	const FirstTab = () => (
		<View style={styles.content}>
			<FlatList
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.cardWrapper}
				data={allRequestsList}
				renderItem={({ item, index }) => (
					<HelpCard
						key={index.toString()}
						onPress={() => onAccept(item)}
						title={item.title}
						content={item.content}
						status={item.status}
						time={item.time}
						date={item.date}
						latitude={item.lat}
						longitude={item.lng}
						// buttonBackColor={item.buttonBackColor || ""}
						// buttonTextColor={item.buttonTextColor || ""}
						// buttonBorderColor={item.buttonBorderColor || ""}
						number={item?.user?.phone}
						helperId={item?.receiver?.id}
						incoming
					/>
				)}
			/>
		</View>
	);

	const SecondTab = () => (
		<View style={styles.content}>
			<FlatList
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.cardWrapper}
				data={myRequestsList}
				renderItem={({ item }) => (
					<HelpCard
						key={index.toString()}
						// onPress={item.onPress}
						id={item.id}
						title={item.content}
						content={item.content}
						status={item.status}
						// time={item.date}
						date={item.date}
						helperId={item?.receiver?.id}
						number={item?.receiver?.phone}
						outgoing
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

const mapStateToProps = ({ sos }) => ({
	counter: sos.counter,
});

const mapDispatchToProps = {
	showLoading,
	hideLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sos);
