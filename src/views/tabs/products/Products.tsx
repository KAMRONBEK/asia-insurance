import React, { useEffect, useState } from "react";
import {
	View,
	StatusBar,
	StyleSheet,
	ScrollView,
	FlatList,
	TouchableWithoutFeedback,
} from "react-native";
import {
	colors,
	CONTAINER_PADDING,
	SCREENS,
	aboutDatas,
	deviceWidth,
} from "../../../constants";
import { strings } from "../../../locales/strings";
import Card from "../../../components/card/Card";
import images from "../../../assets/images";
import Text from "../../../components/common/Text";
import NewsCard from "../../../components/card/NewsCard";
import { navigate } from "../../../utils/NavigationService";
import { requests } from "../../../api/requests";
import { hideLoading, showLoading } from "../../../redux/actions";
import { connect } from "react-redux";

//example
const Products = ({ navigation, hideLoading, showLoading, customerId }) => {
	let [newsList, setNewsList] = useState([]);

	useEffect(() => {
		StatusBar.setBarStyle("light-content");
		StatusBar.setBackgroundColor(colors.darkBlue);
	}, [navigation]);

	const bootstrap = async () => {
		try {
			let res = await requests.news.newsList();
			setNewsList(res.data.data);
		} catch (error) {
			console.log(error.response);
			console.log(error.response.message);
		} finally {
			hideLoading();
		}
	};

	useEffect(() => {
		bootstrap();
	}, []);

	const onCarPress = () => {
		navigation.navigate(SCREENS.aboutInsurance, {
			data: aboutDatas[0],
		});
	};

	const onPlanePress = () => {
		navigation.navigate(SCREENS.aboutInsurance, { data: aboutDatas[1] });
	};

	const onNewsPress = (id) => {
		showLoading(strings.loadingNews);
		navigate(SCREENS.tabs, {
			name: SCREENS.productsStack,
			params: {
				screen: SCREENS.news,
				params: {
					id: id,
				},
			},
		});
	};

	return (
		<ScrollView
			style={{ flex: 1, backgroundColor: colors.ultraLightDark }}
			contentContainerStyle={styles.plane}
			showsVerticalScrollIndicator={false}
		>
			<View style={styles.container}>
				{/* <View style={styles.textWrapper}>
					<Text style={styles.title}>{strings.insuranceCases}</Text>
					<View style={styles.iconWrapper}>
						<Text style={styles.icon}>2</Text>
					</View>
				</View> */}
				<View style={styles.textWrapper}>
					<Text style={styles.title}>
						{strings.buyPolicy} {strings.online}
					</Text>
				</View>
				<Card
					onPress={onCarPress}
					navigation={navigation}
					title={strings.osago}
					desc={strings.osagoInfo}
					image={images.carShield}
				/>
				<Card
					onPress={onPlanePress}
					navigation={navigation}
					title={strings.vzrInfo}
					// desc={strings.vzrInfo}
					image={images.planeShield}
				/>
				<Text style={[styles.title, styles.paddingTop]}>
					{strings.news}
				</Text>
			</View>
			<FlatList
				pagingEnabled={true}
				scrollEventThrottle={1}
				contentContainerStyle={styles.newsWrapper}
				snapToInterval={deviceWidth - 3 * CONTAINER_PADDING}
				snapToAlignment="start"
				data={newsList}
				renderItem={({ item }) => (
					<NewsCard
						item={item}
						onPress={() => onNewsPress(item.id)}
						navigation={navigation}
					/>
				)}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				keyExtractor={(item, index) => index.toString()}
			/>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	plane: {
		paddingBottom: 25,
	},
	container: {
		paddingHorizontal: CONTAINER_PADDING,
	},
	textWrapper: {
		marginTop: 15,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	title: {
		fontSize: 16,
		fontWeight: "bold",
		color: colors.darkBlueText,
	},
	iconWrapper: {
		height: 25,
		width: 25,
		backgroundColor: colors.red,
		borderRadius: 40,
		justifyContent: "center",
		alignItems: "center",
	},
	icon: {
		fontSize: 15,
		color: colors.white,
		fontWeight: "bold",
	},
	paddingTop: {
		paddingTop: 10,
	},
	newsWrapper: {
		paddingLeft: 10,
		paddingVertical: 10,
	},
});

const mapStateToProps = ({ user }) => ({
	customerId: user.customerId,
});

const mapDispatchToProps = {
	hideLoading,
	showLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
