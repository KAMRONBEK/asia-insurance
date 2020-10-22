import React, { useState, useEffect } from "react";
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
import {
	showLoading,
	hideLoading,
	showFlashMessage,
} from "../../../redux/actions";
import { requests } from "../../../api/requests";
import { connect } from "react-redux";

interface ProfileProps {
	navigation: any;
	preData: ImageSourcePropType;
}

const Profile = ({
	navigation,
	showFlashMessage,
	showLoading,
	hideLoading,
}: ProfileProps) => {
	let [regionList, setRegionList] = useState([]);

	let [fullName, setFullName] = useState("");
	let [city, setCity] = useState("");

	const onPress = () => {
		navigation.navigate(SCREENS.products);
	};

	const boot = async () => {
		showLoading(strings.loadingRegions);
		try {
			let res = await requests.dictionary.getRegionList();
			// console.warn(res.data.length);
			let temp = res.data.map((region) => {
				return {
					label: region.text,
					value: {
						text: region.text,
						id: region.id,
					},
				};
			});
			console.warn(temp.length, "oblasts");
			setRegionList(temp);
		} catch (error) {
			console.log(error);
			showFlashMessage({ type: colors.red, message: error });
		} finally {
			hideLoading();
		}
	};

	useEffect(() => {
		boot();
	}, []);

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
				<Input
					icon="user"
					placeholder={strings.fullName}
					setValue={setFullName}
				/>
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
					options={regionList}
					icon="flag"
					selectValue={setCity}
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

const mapStateToProps = ({ user }) => ({
	user,
});

const mapDispatchToProps = {
	showFlashMessage,
	showLoading,
	hideLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
