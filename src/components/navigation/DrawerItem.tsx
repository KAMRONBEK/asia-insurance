import React from "react";
import {
	View,
	StyleSheet,
	GestureResponderEvent,
	TouchableOpacity,
} from "react-native";
import { Icons, colors, deviceWidth } from "../../constants";
import Text from "../../components/common/Text";

export type DrawerItemProps = {
	iconName: string;
	text: string;
	hasBorder?: boolean;
	onPress?: ((event: GestureResponderEvent) => void) | undefined;
	size?: number;
};

const DrawerItem = ({
	iconName,
	text,
	onPress,
	hasBorder = true,
	size,
}: DrawerItemProps) => {
	return (
		<View style={styles.plane}>
			<TouchableOpacity onPress={onPress}>
				<View style={styles.container}>
					<Icons
						style={styles.icon}
						name={iconName}
						color={colors.white}
						size={!size ? 24 : size}
					/>
					<Text
						style={{
							...styles.text,
							borderBottomWidth: hasBorder ? 1 : 0,
						}}
					>
						{text}
					</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	plane: {
		width: deviceWidth * 0.7,
	},
	container: {
		flexDirection: "row",
		marginTop: 8,
	},
	icon: {
		width: 40,
	},
	text: {
		fontWeight: "300",
		color: colors.white,
		borderBottomWidth: 1,
		paddingBottom: 15,
		width: 180,
		borderColor: "rgba(255,255,255,0.13)",
		fontSize: 17,
	},
});

export default DrawerItem;
