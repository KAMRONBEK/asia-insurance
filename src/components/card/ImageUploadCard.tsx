import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	View,
	Image,
	TouchableWithoutFeedback,
} from "react-native";
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
import { formData, constructFileFromUri } from "../../api/requests";
import { connect } from "react-redux";
import { setDocuments } from "../../redux/actions";

interface ImageUploadCardProps {
	name: string;
	data: never[];
	setData: any;
	docType: number;
}

const ImageUploadCard = ({
	name,
	data,
	setData,
	docType,
	setDocuments,
}: ImageUploadCardProps) => {
	let [images, setImages] = useState([]);
	let [fileName, setFileName] = useState(name);

	const onChoosePress = () => {
		ImagePicker.openPicker({
			multiple: true,
			includeBase64: true,
		})
			.then((pictures) => {
				setImages([...pictures, ...images]);
				pictures.map((picture) => {
					setData([
						...data,
						{
							DocumentTypeEnum: docType,
							File: picture.data,
						},
					]);
				});
			})
			.catch((err) => console.warn(err));
	};

	const onCameraPress = () => {
		ImagePicker.openCamera({
			includeBase64: true,
			multiple: true,
		})
			.then((picture) => {
				setImages([picture, ...images]);
				setData([
					...data,
					{
						DocumentTypeEnum: docType,
						File: picture.data,
					},
				]);
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

					<TouchableWithoutFeedback onPress={onChoosePress}>
						<Icons name="form" color={colors.darkBlue} size={28} />
					</TouchableWithoutFeedback>
				</View>
				<TouchableWithoutFeedback onPress={onCameraPress}>
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

const mapStateToProps = ({ checkout }) => ({});

const mapDispatchToProps = {
	setDocuments,
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageUploadCard);
