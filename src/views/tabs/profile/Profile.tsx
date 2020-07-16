import React from "react";
import {
	View,
	StyleSheet,
	ImageSourcePropType,
	ScrollView,
} from "react-native";
import Header from "../../../components/navigation/Header";
import { strings } from "../../../locales/strings";
import Avatar from "../../../components/common/Avatar";
import { colors, CONTAINER_PADDING, SCREENS } from "../../../constants";
import Text from "../../../components/common/Text";
import Input from "../../../components/common/Input";
import Select from "../../../components/common/Select";
import RoundButton from "../../../components/common/RoundButton";

interface ProfileProps {
	navigation: any;
	preData: ImageSourcePropType;
}

const Profile = ({ navigation }: ProfileProps) => {
	const onPress = () => {
		navigation.navigate(SCREENS.products);
	};

	return (
		<View style={styles.container}>
			<Header
				tall
				navigation={navigation}
				title={strings.userProfile}
				back
				round
			/>
			<View style={styles.avatarWrapper}>
				<Avatar />
				<Text style={styles.avatarText}>
					{strings.chooseProfilePhoto}
				</Text>
			</View>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					paddingBottom: 10,
				}}
				style={styles.content}
			>
				<Input icon="user" placeholder={strings.fullName} />
				<View style={styles.doubleInput}>
					<Input
						placeholder={strings.passportSeries}
						style={{
							justifyContent: "center",
							paddingHorizontal: 10,
							flex: 1,
							marginRight: 5,
						}}
					/>
					<Input
						isNumber
						placeholder={strings.passportNumber}
						style={{
							justifyContent: "center",
							paddingHorizontal: 10,
							flex: 1,
							marginLeft: 5,
						}}
					/>
				</View>
				<Select
					placeholder={strings.currentCity}
					options={[
						{ label: "Tashkent", value: "Tashkent" },
						{ label: "Karshi", value: "Karshi" },
						{ label: "Samarqand", value: "Samarqand" },
					]}
					icon="flag"
				/>
				<Input
					placeholder={strings.residenceAddress}
					icon="marker-home"
				/>
				<Input
					placeholder={strings.emailForAccessRecovery}
					icon="message"
				/>
				<View style={styles.buttonWrapper}>
					<RoundButton
						gradient
						text={strings.save}
						onPress={onPress}
					/>
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.ultraLightDark,
	},
	content: {
		paddingHorizontal: 2 * CONTAINER_PADDING,
		paddingTop: 30,
	},
	avatarWrapper: {
		alignItems: "center",
		marginTop: -40,
	},
	avatarText: {
		fontSize: 14,
		fontWeight: "500",
		paddingBottom: 15,
	},
	doubleInput: {
		flexDirection: "row",
	},
	buttonWrapper: {
		paddingHorizontal: CONTAINER_PADDING,
		paddingBottom: 20,
	},
});

export default Profile;
