import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	GestureResponderEvent,
	TouchableOpacity,
} from "react-native";
import { LocalizedStringsMethods } from "react-native-localization";
import {
	colors,
	CONTAINER_PADDING,
	Icons,
	deviceWidth,
	SCREENS,
} from "../../constants";
import Touchable from "./Touchable";
import { navigate } from "../../utils/NavigationService";

interface PlainTextProps {
	item: any;
	setIndex?: (arg0: number) => void;
	currentIndex?: number;
	selected?: boolean;
	radio?: boolean;
	navigation?: any;
	setValue?: any;
	onPress: any;
}

const PlainText = ({
	item,
	setIndex,
	currentIndex,
	selected,
	radio,
	navigation,
	setValue,
	onPress,
}: PlainTextProps) => {
	useEffect(() => {
		console.warn(selected);
	}, [selected]);

	let [checked, setChecked] = useState(selected);
	const onRadioPress = () => {
		setChecked(!checked);
	};
	return (
		<Touchable
			onPress={() => {
				onPress();
				onRadioPress();
			}}	
		>
			<View style={styles.container}>
				<Text style={styles.text}>{item.name}</Text>
				{radio && (
					// <TouchableOpacity onPress={onRadioPress}>
					<View style={styles.radio}>
						<View
							style={[
								styles.radioIcon,
								!!checked && {
									backgroundColor: colors.red,
								},
							]}
						/>
					</View>
					// </TouchableOpacity>
				)}
			</View>
		</Touchable>
	);
};

const styles = StyleSheet.create({
	container: {
		borderBottomWidth: 1,
		borderBottomColor: colors.paleGray,
		marginHorizontal: CONTAINER_PADDING,
		paddingVertical: 20,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	text: {
		fontSize: 16,
		width: deviceWidth * 0.8,
	},
	radio: {
		height: 15,
		borderRadius: 15,
		width: 15,
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 1,
	},
	radioIcon: {
		height: 7,
		width: 7,
		borderRadius: 7,
		backgroundColor: colors.gray,
	},
});

export default PlainText;
