import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import Header from "../../../components/navigation/Header";
import { strings } from "../../../locales/strings";
import { colors, CONTAINER_PADDING, SCREENS, Icons } from "../../../constants";
import PayoutCard from "../../../components/card/PayoutCard";
import Touchable from "../../../components/common/Touchable";
import Text from "../../../components/common/Text";

const Payouts = ({ navigation }) => {
	const onPlusPress = () => {
		navigation.navigate(SCREENS.policySelect);
	};
	return (
		<View style={styles.plane}>
			<Header
				title={strings.myPayouts}
				navigation={navigation}
				back
				round
				tall
			/>
			<ScrollView
				showsVerticalScrollIndicator={false}
				style={styles.container}
			>
				<PayoutCard
					policyNumber="757997"
					status="Одобрено"
					date="14.03.2020"
					orderId="4364644554"
				/>
				<PayoutCard
					policyNumber="757997"
					status="Одобрено"
					date="14.03.2020"
					orderId="4364644554"
				/>
				<PayoutCard
					policyNumber="757997"
					status="Одобрено"
					date="14.03.2020"
					orderId="4364644554"
				/>
				<PayoutCard
					policyNumber="757997"
					status="Одобрено"
					date="14.03.2020"
					orderId="4364644554"
				/>
			</ScrollView>
			<View style={styles.buttonWrapper}>
				<View style={styles.iconWrapper}>
					<Touchable onPress={onPlusPress}>
						<View
							style={{
								justifyContent: "center",
								alignItems: "center",
								backgroundColor: colors.green,
								height: 60,
								width: 60,
							}}
						>
							<Icons
								name="x"
								size={25}
								color={colors.white}
								style={styles.icon}
							/>
						</View>
					</Touchable>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	plane: {
		flex: 1,
		backgroundColor: colors.ultraLightDark,
	},
	container: {
		marginTop: -40,
		marginBottom: 20,
		flex: 1,
		paddingHorizontal: CONTAINER_PADDING,
	},
	buttonWrapper: {
		position: "absolute",
		bottom: 10,
		right: CONTAINER_PADDING,
	},
	iconWrapper: {
		borderRadius: 100,
		overflow: "hidden",
	},
	icon: {
		transform: [{ rotate: "45deg" }],
	},
});

export default Payouts;
