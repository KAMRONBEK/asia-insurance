import React, { useState } from "react";
import { StyleSheet, View, Image, ImageSourcePropType } from "react-native";
import { colors, Icons } from "../../constants";
import images from "../../assets/images";
import ImagePicker from "react-native-image-picker";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Text from "./Text";

interface AvatarProps {
	preImage: ImageSourcePropType;
}

const Avatar = ({ preImage }: AvatarProps) => {
	let [image, setImage] = useState(preImage);

	const options = {
		title: "Select Avatar",
		customButtons: [{ name: "fb", title: "Choose Photo from Facebook" }],
		storageOptions: {
			skipBackup: true,
			path: "images",
		},
	};

	const onAvatarPress = () => {
		ImagePicker.showImagePicker(options, (response) => {
			console.log("Response = ", response);

			if (response.didCancel) {
				console.log("User cancelled image picker");
			} else if (response.error) {
				console.log("ImagePicker Error: ", response.error);
			} else if (response.customButton) {
				console.log(
					"User tapped custom button: ",
					response.customButton
				);
			} else {
				const source = { uri: response.uri };

				// You can also display the image using data:
				// const source = { uri: 'data:image/jpeg;base64,' + response.data };

				setImage(source);
			}
		});
	};

	return (
		<View style={styles.container}>
			<TouchableWithoutFeedback onPress={onAvatarPress}>
				{!!image ? (
					<Image source={image} style={styles.image} />
				) : (
					<Icons name="camera" size={25} color={colors.gray} />
				)}
			</TouchableWithoutFeedback>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.ultraLightDark,
		height: 120,
		width: 120,
		borderWidth: 8,
		borderColor: colors.white,
		borderRadius: 300,
		justifyContent: "center",
		alignItems: "center",
		overflow: "hidden",
	},
	image: {
		height: 120,
		width: 120,
		resizeMode: "cover",
	},
});

export default Avatar;
