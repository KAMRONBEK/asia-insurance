import React, { useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import {
	colors,
	BORDER_RADIUS,
	CONTAINER_PADDING,
	Icons,
	deviceHeight,
	deviceWidth,
} from "../../constants";
import images from "../../assets/images";
import Text from "../common/Text";
// import ImagePicker from "react-native-image-picker";
import ImagePicker from "react-native-image-crop-picker";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

interface ImageUploadCardProps {
	name: string;
	data: never[];
	setData: any;
}

const ImageUploadCard = ({ name, data, setData }: ImageUploadCardProps) => {
	let [images, setImages] = useState();
	let [fileName, setFileName] = useState(name);

	const onCameraPress = () => {
		ImagePicker.openPicker({
			multiple: true,
		})
			.then((images) => {
				// console.log(images);
				setImages(images);
				setData([...data, { passport: images }]);
			})
			.catch((err) => console.warn(err));
	};

	return (
		<View style={styles.container}>
			<TouchableWithoutFeedback onPress={onCameraPress}>
				<View style={styles.row}>
					<Text style={styles.title}>{fileName}</Text>
					<Icons
						name="camera-sick"
						color={colors.darkBlue}
						size={40}
					/>
				</View>
			</TouchableWithoutFeedback>

			{images && (
				<View
					style={[
						{
							paddingTop: 10,
							flexDirection: "row",
							justifyContent: "space-between",
						},
						images.length == 1 && {
							justifyContent: "center",
						},
					]}
				>
					{images.map((item, index) => {
						if (index <= 1) {
							return (
								<Image
									source={{
										uri: item.path,
									}}
									style={[
										styles.image,
										images.length == 1 && {
											height: 150,
											width: 300,
											resizeMode: "contain",
										},
									]}
								/>
							);
						}
					})}
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white,
		borderRadius: BORDER_RADIUS,
		padding: CONTAINER_PADDING,
		marginTop: 20,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	title: {
		fontSize: 16,
		maxWidth: deviceWidth * 0.7,
	},
	image: {
		height: 100,
		minWidth: deviceWidth / 2 - 40,
		resizeMode: "contain",
	},
});
export default ImageUploadCard;
