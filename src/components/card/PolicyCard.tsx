import React, { useState } from "react";
import {
	StyleSheet,
	View,
	ImageSourcePropType,
	Image,
	TouchableOpacity,
	TouchableWithoutFeedback,
} from "react-native";
import { colors, BORDER_RADIUS, CONTAINER_PADDING } from "../../constants";
import { strings } from "../../locales/strings";
import Text from "../common/Text";
import Touchable from "../common/Touchable";

interface PolicyCardProps {
	image: ImageSourcePropType;
	id: string;
	title: string;
	date?: string;
	radio?: boolean;
	check?: boolean;
	onValueChange: any;
	radioValue: {
		osago: boolean;
		vzr: boolean;
	};
}

const PolicyCard = ({
	image,
	id,
	title,
	date,
	radio,
	check,
	onValueChange,
	radioValue,
}: PolicyCardProps) => {
	const onRadioPress = () => {
		onValueChange({ osago: !radioValue.osago, vzr: !radioValue.vzr });
	};

	return (
		<TouchableWithoutFeedback onPress={radio ? onRadioPress : null}>
			<View style={styles.container}>
				<Image source={image} style={styles.image} />
				<View style={styles.row}>
					<View style={styles.column}>
						<Text style={styles.text}>ID:{id}</Text>
						<Text style={styles.bold}>{title}</Text>
					</View>
					<View style={styles.column}>
						<Text style={styles.text}>{strings.validityDate}</Text>
						<Text
							style={[
								styles.bold,
								{
									color: !!date
										? colors.darkBlue
										: colors.red,
								},
							]}
						>
							{!!date ? date : strings.expired}
						</Text>
					</View>
					{radio && (
						<View style={styles.column}>
							<View style={styles.radio}>
								<View
									style={[
										styles.radioIcon,
										!!check && {
											backgroundColor: colors.red,
										},
									]}
								/>
							</View>
						</View>
					)}
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white,
		borderRadius: BORDER_RADIUS,
		paddingHorizontal: CONTAINER_PADDING,
		paddingVertical: 20,
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 15,
	},
	image: {
		height: 50,
		width: 50,
		resizeMode: "contain",
	},
	row: {
		paddingLeft: 15,
		flex: 1,
		justifyContent: "space-between",
		flexDirection: "row",
	},
	column: {
		justifyContent: "center",
	},
	text: {
		fontSize: 13,
	},
	bold: {
		fontSize: 16,
		fontWeight: "bold",
	},
	radio: {
		width: 18,
		height: 18,
		borderRadius: 18,
		borderWidth: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	radioIcon: {
		backgroundColor: colors.gray,
		height: 8,
		width: 8,
		borderRadius: 8,
	},
});

export default PolicyCard;
