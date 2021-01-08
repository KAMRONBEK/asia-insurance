import React, { useState, useEffect } from "react";
import { View } from "react-native";

const MultiInputWrapper = ({ children, inputs, ...rest }) => {
	// let [inputs, setInputs] = useState([]);

	let renderChildren = (children) => {
		return React.Children.map(children, (child, index) => {
			if (child.children) return renderChildren(children);
			if (child.type.name !== "TextInput") return child;

			return React.cloneElement(child, {
				// inputRef: (ref) =>
				// 	setInputs([...inputs, (inputs[index] = ref)]),
				// inputRef: (ref) => (this.inputs[index] = ref),
			});
		});
	};

	useEffect(() => {
		// console.warn(inputs);
	}, [inputs]);

	return <View {...rest}>{renderChildren(children)}</View>;
};

export default MultiInputWrapper;
