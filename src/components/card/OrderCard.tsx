import React, { useState } from "react";
import {
	StyleSheet,
	View,
	GestureResponderEvent,
	ImageSourcePropType,
	Image,
	LayoutAnimation,
	TouchableWithoutFeedback,
	TouchableOpacity,
} from "react-native";
import {
	colors,
	Icons,
	CONTAINER_PADDING,
	BORDER_RADIUS,
} from "../../constants";
import Text from "../common/Text";
import Touchable from "../common/Touchable";
import { strings } from "../../locales/strings";

interface OrderCardProps {
	onPress?: ((event: GestureResponderEvent) => void) | undefined;
	image: ImageSourcePropType;
	title: string;
	id: string;
	status: string;
	date: string;
	policyPrice: string;
	currency: string;
	paymentStatus: string;
	description: string;
	insurancePrice: string;
}

const OrderCard = ({
	onPress,
	image,
	title,
	id,
	status,
	date,
	policyPrice,
	currency,
	paymentStatus,
	description,
	insurancePrice,
}: OrderCardProps) => {
	let [isOpen, setIsOpen] = useState(false);
	const onTogglePress = () => {
		setIsOpen(!isOpen);
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
	};
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View style={styles.container}>
				<View style={styles.top}>
					<View style={styles.column}>
						<View style={styles.row}>
							<Image source={image} style={styles.image} />
							<View style={styles.titleWrapper}>
								<Text style={styles.title}>{title}</Text>
								<Text style={styles.text}>{id}</Text>
							</View>
						</View>
						<Text style={[styles.text, styles.paddingTop]}>
							{strings.policyCost}
						</Text>
						<Text style={styles.boldText}>
							{policyPrice}
							<Text style={styles.currency}> {currency}</Text>
						</Text>
					</View>
					<View style={styles.column}>
						<Text style={styles.text}>{strings.status}</Text>
						<Text
							style={[
								styles.boldText,
								status === "Доставлен" && {
									color: colors.green,
								},
								status === "В обработке" && {
									color: colors.red,
								},
							]}
						>
							{status}
						</Text>
						<Text style={[styles.text, styles.paddingTop]}>
							{strings.date}
						</Text>
						<Text style={styles.boldText}>{date}</Text>
					</View>
					<TouchableOpacity onPress={onTogglePress}>
						<View
							style={{
								transform: [
									{ rotate: isOpen ? "180deg" : "2deg" },
								],
							}}
						>
							<Icons
								name="chevron-down"
								size={24}
								color={colors.gray}
							/>
						</View>
					</TouchableOpacity>
				</View>
				{isOpen && (
					<View style={styles.bottom}>
						<View style={styles.row}>
							<View style={styles.column}>
								<Text style={styles.text}>
									{strings.insuranceCost}
								</Text>
								<Text style={styles.boldText}>
									{insurancePrice}
									<Text style={styles.currency}>
										{" "}
										{currency}
									</Text>
								</Text>
							</View>
							<View style={styles.column}>
								<Text style={styles.text}>
									{strings.paymentStatus}
								</Text>
								<Text style={styles.boldText}>
									{paymentStatus}
								</Text>
							</View>
						</View>
						<Text style={styles.desc}>{description}</Text>
					</View>
				)}
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white,
		padding: CONTAINER_PADDING,
		paddingVertical: 25,
		marginBottom: CONTAINER_PADDING,
		borderRadius: BORDER_RADIUS,
	},
	top: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	column: {
		paddingBottom: 20,
	},
	image: {
		width: 50,
		height: 35,
		resizeMode: "contain",
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	titleWrapper: {
		paddingLeft: 10,
	},
	title: {
		fontSize: 16,
		fontWeight: "bold",
	},
	text: {
		fontSize: 14,
	},
	boldText: {
		fontSize: 14,
		fontWeight: "bold",
	},
	currency: {
		fontWeight: "300",
	},
	paddingTop: {
		paddingTop: 15,
	},
	desc: {
		color: colors.grayText,
	},
});

export default OrderCard;
