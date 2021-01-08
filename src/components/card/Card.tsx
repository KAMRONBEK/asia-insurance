import React from "react";
import {
	StyleSheet,
	View,
	Image,
	ImageSourcePropType,
	TouchableWithoutFeedback,
	GestureResponderEvent,
} from "react-native";
import { colors, Icons, deviceHeight, BORDER_RADIUS } from "../../constants";
import Text from "../common/Text";

interface CardProps {
	navigation: any;
	image: ImageSourcePropType;
	title: string;
	desc: string;
	secondaryIcon?: string;
	passive?: boolean;
	onPress?: ((event: GestureResponderEvent) => void) | undefined;
	small?: boolean;
	checked?: boolean;
	icon?: string;
}

const Card = ({
	navigation,
	image,
	title,
	desc,
	secondaryIcon,
	passive,
	onPress,
	small,
	icon,
	checked,
}: CardProps) => {
	return (
		<TouchableWithoutFeedback onPress={!passive ? onPress : undefined}>
			<View
				style={[
					styles.container,
					passive && {
						opacity: 0.5,
					},
					small && {
						paddingVertical: 15,
					},
				]}
			>
				{image && (
					<Image
						source={image}
						style={[
							styles.image,
							small && {
								height: 30,
							},
						]}
					/>
				)}
				{icon && (
					<View
						style={{
							width: 30,
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Icons name={icon} color={colors.gray} size={20} />
						{checked && (
							<View style={styles.checkWrapper}>
								<Icons
									name="check1"
									size={14}
									color={colors.white}
								/>
							</View>
						)}
					</View>
				)}
				<View style={styles.middle}>
					<Text
						style={[
							styles.title,
							!!icon && {
								color: colors.darkBlue,
							},
						]}
					>
						{title}
					</Text>
					{desc && (
						<Text
							style={[
								styles.desc,
								!!icon && {
									fontWeight: "300",
								},
							]}
							numberOfLines={10}
						>
							{desc}
						</Text>
					)}
				</View>
				<View style={styles.icon}>
					<Icons
						name="chevron-right"
						color={!icon ? colors.gray : colors.darkBlue}
						size={25}
					/>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white,
		borderRadius: BORDER_RADIUS,
		flexDirection: "row",
		alignItems: "center",
		padding: 15,
		paddingVertical: 15,
		marginTop: 15,
	},
	image: {
		height: 56,
		width: 56,
		resizeMode: "contain",
	},
	middle: {
		flex: 1,
		marginLeft: 10,
		justifyContent: "center",
	},
	icon: {
		paddingLeft: 15,
	},
	title: {
		fontWeight: "bold",
		fontSize: 16,
	},
	desc: {
		fontSize: 14,
	},
	checkWrapper: {
		position: "absolute",
		top: 12,
		right: -5,
		height: 20,
		width: 20,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 40,
		overflow: "hidden",
		backgroundColor: colors.red,
	},
});

export default Card;
