import React, { useEffect, useState } from "react";
import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";
import { colors, deviceWidth } from "../../../constants";
import { connect } from "react-redux";
import { showLoading, hideLoading } from "../../../redux/actions";
import { requests } from "../../../api/requests";
import { url } from "../../../api/config";

const News = ({ navigation, hideLoading, showLoading, route }) => {
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
	let id = route.params.id;
	let [news, setNews] = useState({});
	const bootstrap = async () => {
		try {
			let res = await requests.news.newsIdividual(id);
			console.log(res.data.data);
			setNews(res.data.data);
		} catch (error) {
			console.log(error.response.message);
		} finally {
			hideLoading();
		}
	};

	useEffect(() => {
		bootstrap();
	}, []);

	return (
		<React.Fragment>
			<Animated.ScrollView
				showsVerticalScrollIndicator={false}
				style={{
					backgroundColor: colors.ultraLightDark,
				}}
				onScroll={Animated.event(
					[
						{
							nativeEvent: {
								contentOffset: {
									y: value,
								},
							},
						},
					],
					{ useNativeDriver: true }
				)}
			>
				<View style={{ height: imageHeight }}>
					<Animated.Image
						style={{
							height: imageHeight,
							transform: [{ translateY }, { scale }],
						}}
						source={{
							uri: url + news.photo,
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
							{news.title}
						</Text>
					</View>
					<Text
						style={{
							lineHeight: 20,
							fontSize: 16,
							fontWeight: "400",
						}}
					>
						{news.content}
					</Text>
				</View>
			</Animated.ScrollView>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
	showLoading,
	hideLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(News);
