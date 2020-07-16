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

interface NewsCardProps {
	navigation: {};
	item: {
		banner: ImageSourcePropType;
		title: string;
		date: string;
		content: string;
		to: string;
	};
	onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

const NewsCard = ({ navigation, item, onPress }: NewsCardProps) => {
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View style={styles.container}>
				<Image source={{ uri: item.banner }} style={styles.banner} />
				<View style={styles.contentWrapper}>
					<View style={styles.titleAndDate}>
						<Text style={styles.title}>{item.title}</Text>
						<Text style={styles.date}>{item.date}</Text>
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
