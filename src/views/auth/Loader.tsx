import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Image, StyleSheet, View, StatusBar } from "react-native";
import {
	Transition,
	Transitioning,
	TransitioningView,
} from "react-native-reanimated";
//@ts-ignore
import RoundButton from "../../components/common/RoundButton";
import { colors, SCREENS } from "../../constants";
import { strings } from "../../locales/strings";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParams } from "../";
import images from "../../assets/images";

type DefaultNavigationProps = StackNavigationProp<
	AuthStackParams,
	SCREENS.loader
>;

type Props = {
	navigation: DefaultNavigationProps;
};

export const Loader = ({ navigation }: Props) => {
	useEffect(() => {
		StatusBar.setBarStyle("dark-content");
		StatusBar.setBackgroundColor(colors.ultraLightDark);
	}, [navigation]);

	const [loading, setLoading] = useState(true);
	const transitionRef = useRef<TransitioningView | null>();
	const transition = (
		<Transition.Sequence>
			<Transition.Out type="scale" />
			<Transition.Change interpolation="easeInOut" />
			<Transition.In type="fade" />
		</Transition.Sequence>
	);
	useEffect(() => {
		setTimeout(() => {
			if (!!transitionRef.current) {
				transitionRef.current.animateNextTransition();
			}
			setLoading(false);
		}, 1000);
	}, []);
	let defaultPressHandle = () => {
		navigation.navigate(SCREENS.auth);
	};
	return (
		<Transitioning.View
			{...{ ref: (ref) => (transitionRef.current = ref), transition }}
			style={{
				...styles.centeredContainer,
			}}
		>
			<Image source={images.logo} style={styles.logo} />
			{!loading && (
				<>
					<View>
						<RoundButton
							onPress={defaultPressHandle}
							text={strings.ru}
							color={colors.lightBlue}
							fontWeight="500"
							fontSize={18}
						/>
						<RoundButton
							onPress={defaultPressHandle}
							text={strings.uz}
							color={colors.red}
							fontWeight="500"
							fontSize={18}
						/>
					</View>
					<Image source={images.language} style={styles.image} />
				</>
			)}
		</Transitioning.View>
	);
};

let { width } = Dimensions.get("window");
let logoWidth = width - 70;
let imageWidth = width - 100;

const styles = StyleSheet.create({
	logo: {
		width: logoWidth,
		height: logoWidth / 8.8,
	},
	centeredContainer: {
		justifyContent: "space-around",
		alignItems: "center",
		flex: 1,
		backgroundColor: colors.ultraLightDark,
	},
	image: {
		width: imageWidth,
		height: imageWidth / 1.02,
	},
});
