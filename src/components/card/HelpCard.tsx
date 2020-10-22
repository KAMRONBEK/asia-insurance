import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	GestureResponderEvent,
	Linking,
} from "react-native";
import {
	colors,
	BORDER_RADIUS,
	CONTAINER_PADDING,
	Icons,
	deviceWidth,
	SCREENS,
} from "../../constants";
import RoundButton from "../common/RoundButton";
import { strings } from "../../locales/strings";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { navigate } from "../../utils/NavigationService";
import { requests } from "../../api/requests";
import { showFlashMessage, setUpdateSosList } from "../../redux/actions";
import { connect } from "react-redux";

interface HelpCardProps {
	id: number;
	onPress?: ((event: GestureResponderEvent) => void) | undefined;
	title: string;
	content: string;
	status: number;
	time: string;
	date: string;
	buttonText: string;
	helperId?: string;
	number: string;
	latitude?: number;
	longitude?: number;
	incoming?: boolean;
	outgoing?: boolean;
}

const HelpCard = ({
	id,
	onPress,
	title,
	content,
	status,
	time,
	date,
	buttonText,
	helperId,
	number,
	latitude,
	longitude,
	incoming,
	outgoing,
	showFlashMessage,
	setUpdateSosList,
	user,
}: HelpCardProps) => {
	let [ID, setID] = useState("");

	let sendID = async () => {
		try {
			console.log(id, "request_id");

			let res = await requests.ball.sendBall({ id: ID, request_id: id });
			setUpdateSosList();
		} catch (error) {
			console.log(error.response.data);
			showFlashMessage({
				type: colors.red,
				message: error?.response?.data?.id?.errors,
			});
		}
	};

	const resend = async () => {
		try {
			let res = await requests.help.resendRequest({ request_id: id });
			console.log(res.data.data);
			setUpdateSosList();
		} catch (error) {
			console.log(error);
		}
	};

	const statusText = () => {
		switch (status) {
			case 0:
				return strings.newRequest;
			case 1:
				return strings.waitingHelp;
			case 2:
				return strings.closedRequest;
			default:
				break;
		}
	};

	const statusColor = () => {
		switch (status) {
			case 0:
				return {
					color: colors.red,
				};
			case 1:
				return {
					color: colors.grayText,
				};
			case 2:
				return {
					color: colors.green,
				};
		}
	};

	const renderBottomIncoming = () => {
		switch (status) {
			case 0:
				return (
					<View style={styles.buttonWrapper}>
						<View style={styles.iconWrapper}>
							<TouchableOpacity
								onPress={() => {
									Linking.openURL(
										`geo:${latitude},${longitude}`
									);
								}}
							>
								<Icons
									name="flag"
									size={25}
									color={colors.darkBlue}
								/>
							</TouchableOpacity>
						</View>
						<RoundButton
							onPress={onPress || sendID}
							text={strings.respondToHelp}
							radius={10}
							number={number}
							backgroundColor={colors.darkBlue}
						/>
					</View>
				);
			case 1:
				return (
					<View style={styles.buttonWrapper}>
						<View style={styles.iconWrapper}>
							<TouchableOpacity
								onPress={() => {
									Linking.openURL(
										`geo:${latitude},${longitude}`
									);
								}}
							>
								<Icons
									name="flag"
									size={25}
									color={colors.darkBlue}
								/>
							</TouchableOpacity>
						</View>
						{user.id == helperId ? (
							<RoundButton
								onPress={() => {
									Linking.openURL(`tel:${number}`);
								}}
								text={number}
								radius={10}
								backgroundColor={colors.white}
								color={colors.darkBlue}
							/>
						) : (
							<RoundButton
								onPress={onPress || sendID}
								text={strings.respondToHelp}
								radius={10}
								number={number}
								backgroundColor={colors.darkBlue}
								passive
							/>
						)}
					</View>
				);
			case 2:
				return;

			default:
				break;
		}
	};

	const renderBottomOutgoing = () => {
		switch (status) {
			case 0:
				return;
			case 1:
				return (
					<>
						<View style={styles.buttonWrapper}>
							<View style={styles.iconWrapper}>
								<TextInput
									style={{
										fontSize: 16,
										color: colors.darkBlue,
										padding: 0,
										width: 35,
									}}
									placeholder="ID"
									keyboardType="decimal-pad"
									value={ID}
									onChangeText={(text) => setID(text)}
								></TextInput>
							</View>
							<RoundButton
								onPress={sendID}
								text={strings.helpAccepted}
								radius={10}
								number={number}
								backgroundColor={colors.darkBlue}
							/>
						</View>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-around",
								alignItems: "center",
							}}
						>
							<Text style={{}}>{strings.helping}:</Text>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
								}}
							>
								<Text style={{ fontWeight: "600" }}>
									{number}
									{"   "}
								</Text>
								<TouchableOpacity
									onPress={() => {
										Linking.openURL(`tel:${number}`);
									}}
								>
									<View
										style={{
											borderRadius: 30,
											width: 30,
											height: 30,
											backgroundColor: colors.green,
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										<Icons
											name="phone"
											color={colors.white}
											size={20}
										/>
									</View>
								</TouchableOpacity>
							</View>
							<TouchableOpacity onPress={resend}>
								<View
									style={{
										borderRadius: 30,
										width: 30,
										height: 30,
										backgroundColor: colors.red,
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									<Icons
										name="x"
										color={colors.white}
										size={20}
									/>
								</View>
							</TouchableOpacity>
						</View>
					</>
				);
			case 2:
				return (
					<Text style={styles.bold}>
						{strings.helped} ID {helperId}
					</Text>
				);

			default:
				break;
		}
	};
	return (
		<View style={styles.container}>
			<View style={styles.titleWrapper}>
				<Text style={[styles.bold, { width: deviceWidth * 0.4 }]}>
					{title}
				</Text>
				<Text style={[styles.status, statusColor()]}>
					{statusText()}
				</Text>
			</View>
			<Text style={styles.content}>{content}</Text>
			<Text style={styles.date}>
				{/* {time},  */}
				{date}
			</Text>
			{incoming ? renderBottomIncoming() : renderBottomOutgoing()}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: BORDER_RADIUS,
		backgroundColor: colors.white,
		paddingHorizontal: CONTAINER_PADDING,
		paddingVertical: 20,
		marginBottom: 15,
	},
	titleWrapper: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	bold: {
		fontSize: 16,
		fontWeight: "bold",
	},
	status: {
		fontSize: 16,
	},
	date: {
		fontSize: 13,
		textAlign: "right",
	},
	content: {
		paddingTop: 5,
		fontSize: 13,
		lineHeight: 25,
	},
	buttonWrapper: {
		paddingTop: 30,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	iconWrapper: {
		borderWidth: 0.5,
		borderColor: colors.gray,
		padding: 13,
		paddingHorizontal: 20,
		marginBottom: 20,
		borderRadius: 10,
		marginRight: 20,
	},
});

const mapStateToProps = ({ user }) => ({
	user: user.user,
});

const mapDispatchToProps = {
	showFlashMessage,
	setUpdateSosList,
};

export default connect(mapStateToProps, mapDispatchToProps)(HelpCard);
