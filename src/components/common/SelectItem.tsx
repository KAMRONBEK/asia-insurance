import React, { useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { colors, CONTAINER_PADDING, Icons, deviceWidth } from "../../constants";
import { connect } from "react-redux";
import { removeInsuranceData } from "../../redux/actions";
import { strings } from "../../locales/strings";

interface SelectItemProps {
	item: {
		name: string;
		parent: string;
		child: string;
	};
}

const SelectItem = ({ item, osago, removeInsuranceData }: SelectItemProps) => {
	console.log("box", item);

	return (
		<View style={styles.container}>
			<Text
				numberOfLines={1}
				style={{
					textTransform: "capitalize",
					maxWidth: deviceWidth - 100,
				}}
			>
				{item.name}
			</Text>
			<View
				style={{
					borderRadius: 30,
					overflow: "hidden",
				}}
			>
				<TouchableOpacity
					onPress={() => {
						console.log({
							parent: item.parent,
							child: item.child,
						});

						removeInsuranceData({
							parent: item.parent,
							child: item.child,
						});
					}}
				>
					<View style={{ paddingLeft: 10 }}>
						<Icons name="x" size={20} color={colors.red} />
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: 20,
		borderWidth: 0.5,
		borderColor: colors.gray,
		height: 30,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 10,
		marginRight: 10,
		marginBottom: 10,
	},
});

const mapStateToProps = ({ insurance: { osago } }) => ({ osago });

const mapDispatchToProps = {
	removeInsuranceData,
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectItem);
