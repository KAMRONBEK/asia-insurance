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
	let [images, setImages] = useState([]);
	let [fileName, setFileName] = useState(name);

	const onCameraPress = () => {
		ImagePicker.openPicker({
			multiple: true,
		})
			.then((pictures) => {
				console.log(pictures);
				setImages([...pictures, ...images]);
				setData([...data, { passport: pictures }]);
			})
			.catch((err) => console.warn(err));
	};
	const onChoosePress = () => {
		ImagePicker.openCamera({
			multiple: true,
		})
			.then((picture) => {
				console.log(picture);
				setImages([picture, ...images]);
				setData([...data, { passport: images }]);
			})
			.catch((err) => console.warn(err));
	};

	return (
		<View style={styles.container}>
			<View style={styles.row}>
				<View
					style={[
						{
							flex: 1,
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
						},
					]}
				>
					<Text style={styles.title}>{fileName}</Text>

					<TouchableWithoutFeedback onPress={onCameraPress}>
						<Icons name="form" color={colors.darkBlue} size={28} />
					</TouchableWithoutFeedback>
				</View>
				<TouchableWithoutFeedback onPress={onChoosePress}>
					<Icons
						name="camera"
						color={colors.darkBlue}
						size={25}
						style={{
							paddingLeft: 10,
						}}
					/>
				</TouchableWithoutFeedback>
			</View>
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
					{images.length > 0 &&
						images.map((item, index) => {
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
		flex: 1,
	},
	row: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
	},
	title: {
		fontSize: 16,
		maxWidth: deviceWidth * 0.6,
	},
	image: {
		height: 100,
		minWidth: deviceWidth / 2 - 40,
		resizeMode: "contain",
	},
});
export default ImageUploadCard;
