import React from "react";
import { StyleSheet, Text, View } from "react-native";
import DocUploadCard from "../../../components/card/DocUploadCard";
import EventCard from "../../../components/common/EventCard";
import Header from "../../../components/navigation/Header";
import { colors, CONTAINER_PADDING } from "../../../constants";
import { strings } from "../../../locales/strings";

const InsuredEventPage = ({ navigation }) => {
	return (
		<View style={styles.plain}>
			<Header
				title={strings.insuredEvents}
				navigation={navigation}
				back
				round
			/>
			<View style={styles.container}>
				<DocUploadCard title={strings.documents} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	plain: {
		backgroundColor: colors.ultraLightDark,
		flex: 1,
	},
	container: {
		flex: 1,
		padding: CONTAINER_PADDING,
	},
});

export default InsuredEventPage;
