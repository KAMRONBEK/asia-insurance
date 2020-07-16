import React, { useRef, useEffect, useState, MutableRefObject } from "react";
import {
	View,
	ScrollView,
	Dimensions,
	StyleSheet,
	Image,
	StatusBar,
} from "react-native";
import { strings } from "../../locales/strings";
import {
	TransitioningView,
	Transition,
	Transitioning,
} from "react-native-reanimated";
import { colors, BORDER_RADIUS } from "../../constants";
import Text from "../../components/common/Text";

export type Intro = {
	imageSource: number; //* image source acquired by importing
	title: string; //* title of intro
	content: string; //* description of intro
	imageRatio: number; //? Image ratio of ImageSource used to properly resize the image
};

//* Indicator props
export type IndicatorsProps = {
	count: number;
	current: number;
};

//* Indicators driven by react-native-reanimated
let Indicators = ({ count, current, navigation }: IndicatorsProps) => {
	//* For indicator change
	const ref = useRef<TransitioningView>(null);
	const transition = <Transition.Change interpolation="easeInOut" />;
	//! Since use effect is called after view change the animation should be configured before state change so we defined our local current as left
	const [left, setLeft] = useState(current * 21);
	useEffect(() => {
		ref.current?.animateNextTransition();
		setLeft(current * 21);
	}, [current]);
	return (
		<View style={styles.indicators}>
			{Array.from({ length: count }).map((e, i) => (
				<View key={i} style={styles.circle} />
			))}
			<View style={StyleSheet.absoluteFillObject}>
				<Transitioning.View
					{...{ transition, ref }}
					style={{
						...styles.circle,
						backgroundColor: colors.red,
						left,
					}}
				/>
			</View>
		</View>
	);
};

export type IntrosProps = {
	introsData: Intro[];
	scroll: any;
	current: number;
};

const Intros = ({ introsData, scroll, current }: IntrosProps) => {
	return (
		<View style={styles.fullWidth}>
			<ScrollView
				ref={scroll[0]}
				horizontal
				showsHorizontalScrollIndicator={false}
				pagingEnabled
				scrollEnabled={false}
			>
				{introsData.map((el, i) => {
					return (
						<View key={i} style={styles.fullWidth}>
							<Image
								style={{
									...styles.image,
									width: imageWidth,
									height: imageWidth / el.imageRatio,
								}}
								source={el.imageSource}
							/>
						</View>
					);
				})}
			</ScrollView>
			<ScrollView
				ref={scroll[1]}
				horizontal
				showsHorizontalScrollIndicator={false}
				scrollEnabled={false}
				pagingEnabled
			>
				{introsData.map((el, i) => {
					return (
						<View key={i} style={styles.fullWidth}>
							<Text style={styles.title}>{el.title}</Text>
						</View>
					);
				})}
			</ScrollView>
			<ScrollView
				ref={scroll[2]}
				horizontal
				showsHorizontalScrollIndicator={false}
				scrollEnabled={false}
				pagingEnabled
			>
				{introsData.map((el, i) => {
					return (
						<View key={i} style={styles.fullWidth}>
							<Text style={styles.text}>{el.content}</Text>
						</View>
					);
				})}
			</ScrollView>
			<Indicators count={introsData.length + 1} current={current} />
		</View>
	);
};

let { width } = Dimensions.get("window");
let imageWidth = width - 120;
const styles = StyleSheet.create({
	circle: {
		width: 13,
		height: 13,
		borderRadius: BORDER_RADIUS,
		backgroundColor: colors.gray,
		margin: 4,
	},
	indicators: {
		flexDirection: "row",
	},
	image: {
		width: width - 120,
		height: (width - 120) / 0.92,
	},
	title: {
		fontWeight: "bold",
		fontSize: 20,
		color: colors.black,
		textAlign: "center",
		maxWidth: 300,
	},
	text: {
		fontWeight: "300",
		fontSize: 14,
		color: colors.black,
		textAlign: "center",
		maxWidth: width - 30,
	},
	fullWidth: {
		width,
		justifyContent: "center",
		alignItems: "center",
		flex: 1,
	},
});

export default Intros;
