import React from "react";
import { StyleSheet, View, Image, ScrollView } from "react-native";
import {
	CONTAINER_PADDING,
	colors,
	deviceWidth,
	SCREENS,
} from "../../../constants";
import Text from "../../../components/common/Text";
import RoundButton from "../../../components/common/RoundButton";
import { strings } from "../../../locales/strings";

interface AboutInsuranceProps {
	route: any;
	navigation: any;
	item: {
		title: string;
		desc: string;
		image: string;
		firstTitle: string;
		firstDesc: string;
		secondTitle: string;
		secondDesc: string;
		menuList: [];
	};
}

const AboutInsurance = ({ navigation, route }: AboutInsuranceProps) => {
	let { data: item } = route.params;
	console.warn(item);

	const onPress = () => {
		navigation.navigate(SCREENS.calculateCost, {
			insuranceType: item.insuranceType,
		});
	};
	return (
		<View style={styles.plane}>
			<ScrollView
				style={styles.container}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.top}>
					<View style={styles.titleWrapper}>
						{/* <Text style={styles.title}>{item.insuranceType}</Text> */}
						<Text style={styles.title}>{item.desc}</Text>
						{/* <Text style={styles.desc}>{item.desc}</Text> */}
					</View>
					<Image style={styles.image} source={item.image} />
				</View>
				<View style={styles.wrapper}>
					<Text style={styles.secTitle}>{item.firstTitle}</Text>
					<Text style={styles.secDecs}>{item.firstDesc}</Text>
				</View>
				<View style={styles.wrapper}>
					<Text style={styles.secTitle}>{item.secondTitle}</Text>
					<Text style={styles.secDecs}>{item.secondDesc}</Text>
				</View>
			</ScrollView>
			<View style={styles.buttonWrapper}>
				<RoundButton
					onPress={onPress}
					text={strings.calculateCost}
					gradient
				/>
			</View>
		</View>
	);
};

let topWidth = deviceWidth - CONTAINER_PADDING;

const styles = StyleSheet.create({
	plane: {
		backgroundColor: colors.ultraLightDark,
		flex: 1,
	},
	container: {
		paddingHorizontal: CONTAINER_PADDING,
		overflow: "visible",
	},
	top: {
		paddingVertical: 10,
		width: topWidth,
		flexDirection: "row",
		paddingBottom: 30,
	},
	titleWrapper: {
		width: topWidth - 110,
	},
	image: {
		width: 114,
		height: 94,
		resizeMode: "cover",
	},
	title: {
		fontSize: 21,
		fontWeight: "bold",
		paddingVertical: 10,
	},
	desc: {
		color: colors.darkBlueText,
	},
	wrapper: {
		paddingBottom: 20,
	},
	secTitle: {
		fontSize: 20,
		fontWeight: "bold",
		paddingVertical: 15,
	},
	secDecs: {
		fontSize: 14,
		color: colors.grayText,
	},
	buttonWrapper: {
		paddingHorizontal: 40,
		paddingBottom: 5,
	},
});

export default AboutInsurance;
