import React from "react";
import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";
import { colors, deviceWidth } from "../../../constants";

const News = ({ navigation }) => {
	let imageHeight = 300;
	let value = new Animated.Value(0);
	const translateY = value.interpolate({
		inputRange: [0, imageHeight * 2],
		outputRange: [0, imageHeight],
	});

	const scale = value.interpolate({
		inputRange: [0, imageHeight],
		outputRange: [1, 1.5],
	});

	return (
		<React.Fragment>
			<Animated.ScrollView
				showsVerticalScrollIndicator={false}
				style={{
					backgroundColor: colors.ultraLightDark,
				}}
				onScroll={Animated.event([
					{
						nativeEvent: {
							contentOffset: {
								y: value,
							},
						},
						
					},
				],)}
			>
				<View style={{ height: imageHeight }}>
					<Animated.Image
						style={{
							height: imageHeight,
							transform: [{ translateY }, { scale }],
						}}
						source={{
							uri: "https://podrobno.uz/upload/iblock/5b3/sp.jpg",
						}}
					/>
					<View
						style={{
							...StyleSheet.absoluteFillObject,
							backgroundColor: colors.black,
							opacity: 0.3,
						}}
					/>
				</View>
				<View
					style={{
						padding: 15,
						backgroundColor: colors.ultraLightDark,
						paddingBottom: 40,
					}}
				>
					<View style={{ alignItems: "center" }}>
						<Text
							style={{
								fontSize: 24,
								fontWeight: "bold",
								paddingBottom: 20,
							}}
						>
							S&P Global Ratings изменило прогноз по кредитному
							рейтингу Узбекистана со "стабильного" на
							"отрицательный"
						</Text>
					</View>
					<Text
						style={{
							lineHeight: 20,
							fontSize: 16,
							fontWeight: "400",
						}}
					>
						Узбекистан, Ташкент – АН Podrobno.uz. Международное
						рейтинговое агентство S&P Global Ratings подтвердило
						суверенный кредитный рейтинг Узбекистана на уровне "BB
						-", но изменило прогноз со "стабильного" на
						"отрицательный", сообщает корреспондент Podrobno.uz. "5
						июня международное рейтинговое агентство S&P Global
						Ratings опубликовало очередной отчёт по суверенному
						кредитному рейтингу Узбекистана. Согласно отчёту,
						агентство сохранило суверенный кредитный рейтинг
						Узбекистана на уровне "BB-". Вместе с тем, прогноз по
						рейтингу республики изменен со "стабильного" на
						"отрицательный", – сообщили в Минфине.
					</Text>
				</View>
			</Animated.ScrollView>
		</React.Fragment>
	);
};
export default News;
