import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import * as shape from "d3-shape";
import React, { useEffect, useState } from "react";
import {
	Animated,
	Dimensions,
	StyleSheet,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { colors } from "../../constants";

const height = 64;
let { width, height: h } = Dimensions.get("window");
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const CustomTabbar = ({
	navigation,
	descriptors,
	state,
}: BottomTabBarProps) => {
	const [value, setValue] = useState(new Animated.Value(-30));
	const [values, setValues] = useState(
		state.routes.map(
			(tab, index) => new Animated.Value(index === 2 ? 1 : 0)
		)
	);
	useEffect(() => {
		const tabWidth = width / state.routes.length;
		value.setValue(-30 + state.index * tabWidth);
		let activeValue = values[state.index];
		Animated.parallel([
			Animated.spring(activeValue, {
				toValue: 1,
				useNativeDriver: true,
			}),
			Animated.spring(value, {
				toValue: -30 + tabWidth * state.index,
				useNativeDriver: true,
			}),
		]).start();
	}, []);
	useEffect(() => {
		const tabWidth = width / state.routes.length;
		values.map((a, i) => {
			a.setValue(0);
		});
		let activeValue = values[state.index];
		Animated.parallel([
			Animated.spring(activeValue, {
				toValue: 1,
				useNativeDriver: true,
			}),
			Animated.spring(value, {
				toValue: -30 + tabWidth * state.index,
				useNativeDriver: true,
			}),
		]).start();
	}, [state]);
	const tabWidth = width / 5 + 60;
	const tab = shape
		.line()
		.x((d) => d.x)
		.y((d) => d.y)
		.curve(shape.curveBasis)([
		{ x: 0, y: 30 },
		{ x: 30, y: 26 },
		{ x: 50, y: 0 },
		{ x: tabWidth - 50, y: 0 },
		{ x: tabWidth - 30, y: 26 },
		{ x: tabWidth, y: 30 },
	]);
	const d = `${tab}`;
	const actualWidth = width / state.routes.length;
	return (
		<View
			style={{
				height,
				width,
				backgroundColor: "white",
			}}
		>
			<AnimatedSvg
				style={{
					height: 30,
					backgroundColor: "transparent",
					width: tabWidth,
					position: "absolute",
					transform: [
						{ translateX: value },
						{ translateY: -height + 34 },
					],
				}}
			>
				<Path {...{ d }} fill="white" stroke="white" />
			</AnimatedSvg>
			<View
				style={{
					...StyleSheet.absoluteFillObject,
					justifyContent: "center",
					shadowColor: "black",
					shadowOffset: { width: -5, height: -5 },
				}}
			>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-evenly",
					}}
				>
					{state.routes.map((route: any, key: number) => {
						const focused = key === state.index;
						const {
							options: { tabBarIcon },
						} = descriptors[route.key];
						const onPress = () => {
							const event = navigation.emit({
								type: "tabPress",
								target: route.key,
								canPreventDefault: true,
							});

							if (!focused && !event.defaultPrevented) {
								navigation.navigate(route.name);
								Animated.spring(value, {
									toValue: -width + actualWidth * key,
									useNativeDriver: true,
								}).start();
							}
						};

						const onLongPress = () => {
							navigation.emit({
								type: "tabLongPress",
								target: route.key,
							});
							Animated.spring(value, {
								toValue: -width + actualWidth * key,
								useNativeDriver: true,
							}).start();
						};

						const activeValue = values[key];
						const translateY = activeValue.interpolate({
							inputRange: [0, 1],
							outputRange: [32, 10],
						});
						const reverseOpacity = activeValue.interpolate({
							inputRange: [0, 1],
							outputRange: [1, 0],
						});
						return (
							<React.Fragment {...{ key }}>
								<TouchableWithoutFeedback
									{...{ onPress, onLongPress }}
								>
									<Animated.View
										style={{
											flex: 1,
											justifyContent: "center",
											alignItems: "center",
											height: 64,
											opacity: reverseOpacity,
										}}
									>
										{!!tabBarIcon &&
											tabBarIcon({
												focused,
												color: "",
												size: 18,
											})}
									</Animated.View>
								</TouchableWithoutFeedback>

								{focused && (
									<Animated.View
										style={{
											position: "absolute",
											width: tabWidth,
											height: 64,
											top: -30,
											justifyContent: "center",
											alignItems: "center",
											transform: [
												{ translateY },
												{ translateX: value },
											],
											opacity: activeValue,
										}}
									>
										<View
											style={{
												justifyContent: "center",
												alignItems: "center",
												width: 55,
												height: 55,
												borderRadius: 30,
												backgroundColor: colors.red,
											}}
										>
											{!!tabBarIcon &&
												tabBarIcon({
													focused,
													color: "",
													size: 18,
												})}
										</View>
									</Animated.View>
								)}
							</React.Fragment>
						);
					})}
				</View>
			</View>
		</View>
	);
};

export default CustomTabbar;
