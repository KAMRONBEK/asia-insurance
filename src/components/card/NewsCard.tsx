import React from "react";
import {
	StyleSheet,
	View,
	ImageSourcePropType,
	Image,
	GestureResponderEvent,
} from "react-native";
import {
	colors,
	deviceWidth,
	CONTAINER_PADDING,
	BORDER_RADIUS,
} from "../../constants";
import Text from "../common/Text";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { url } from "../../api/config";
import moment from "moment";

interface NewsCardProps {
	navigation: {};
	item: {
		photo: ImageSourcePropType;
		title: string;
		date: string;
		content: string;
		to: string;
	};
	onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

const NewsCard = ({ navigation, item, onPress }: NewsCardProps) => {
	let date = moment(item.date).format("DD/MM/YYYY");
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View style={styles.container}>
				<Image
					source={{ uri: url + item.photo }}
					style={styles.banner}
				/>
				<View style={styles.contentWrapper}>
					<View style={styles.titleAndDate}>
						<Text numberOfLines={2} style={styles.title}>
							{item.title}
						</Text>
						<Text style={styles.date}>
							{/* {moment(
								new Date(item.date),
								"DD/MM/YYYY",
								true
							).format()} */}
							{date == "Invalid date" ? "" : date}
						</Text>
					</View>
					<Text style={styles.content} numberOfLines={2}>
						{item.content}
					</Text>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

let bannerWidth = deviceWidth - 4 * CONTAINER_PADDING;

const styles = StyleSheet.create({
	container: {
		borderRadius: BORDER_RADIUS,
		backgroundColor: colors.white,
		marginRight: 15,
		borderRightColor: 10,
		overflow: "hidden",
		width: bannerWidth,
	},
	banner: {
		width: bannerWidth,
		height: 170,
		resizeMode: "cover",
	},
	contentWrapper: {
		paddingVertical: 10,
		paddingHorizontal: 15,
	},
	titleAndDate: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingBottom: 5,
	},
	title: {
		fontSize: 15,
		fontWeight: "bold",
		width: deviceWidth * 0.5,
	},
	date: {
		color: colors.darkBlue,
		fontSize: 13,
	},
	content: {
		color: colors.grayText,
		fontSize: 14,
	},
});

export default NewsCard;
