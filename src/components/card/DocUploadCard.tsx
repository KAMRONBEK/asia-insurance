import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ImagePicker from "react-native-image-crop-picker";
import { BORDER_RADIUS, colors } from "../../constants";

const DocUploadCard = ({ title, setDocument }) => {
	const onPress = () => {
		ImagePicker.openPicker({
			multiple: true,
			includeBase64: true,
		})
			.then((pictures) => {
				setDocument(pictures);
				// setImages([...pictures, ...images]);
				// setData([...data, { passport: pictures }]);
				// pictures.map((picture) => {
				// setData([
				// ...data,
				// {
				// DocumentTypeEnum: docType,
				// File: picture.data,
				// },
				// ]);
				// });
			})
			.catch((err) => console.warn(err));
	};

	return (
		<TouchableOpacity onPress={onPress}>
			<View style={styles.container}>
				<Text>{title}</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 12,
		paddingVertical: 7,
		backgroundColor: colors.white,
		borderRadius: BORDER_RADIUS,
	},
});

export default DocUploadCard;
