import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { colors, CONTAINER_PADDING } from "../../constants";
import { TextInput } from "react-native-gesture-handler";

interface SearchBarProps {
	placeholder: string;
	list: [];
	setList: any;
}

const SearchBar = ({ placeholder, list, setList }: SearchBarProps) => {
	let [searchList, setSearchList] = useState();

	// useEffect(() => {
	// 	if (!!setList) {
	// 		setList(searchList);
	// 	}
	// }, [searchList]);

	return (
		<LinearGradient
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 0 }}
			colors={[colors.lightBlue, colors.darkBlue]}
			style={styles.container}
		>
			<TextInput
				onChangeText={(value) => {
					if (list.length > 0) {
						let searchResult = list.filter((item, index) => {
							if (
								item.name
									.toLowerCase()
									.match(value.toLowerCase())
							)
								return item;
						});

						setList(searchResult);
					}
				}}
				placeholder={placeholder}
				style={styles.input}
				placeholderTextColor={colors.gray}
			/>
		</LinearGradient>
	);
};

export default SearchBar;

const styles = StyleSheet.create({
	container: {
		height: 60,
		paddingHorizontal: CONTAINER_PADDING,
		justifyContent: "center",
	},
	input: {
		padding: 7,
		borderBottomColor: colors.gray,
		borderBottomWidth: 0.5,
		color: colors.white,
		fontSize: 16,
	},
});
