import * as React from "react";
import { StackActions } from "@react-navigation/native";
import { SCREENS } from "../constants";

export function push(...args) {
	navigationRef.current?.dispatch(StackActions.push(...args));
}
export const navigationRef = React.createRef();

interface navigateProps {
	name: string;
	params: {};
}

export function navigate(stack, { name, params }: navigateProps) {
	navigationRef.current?.navigate(stack, { screen: name, params: params });
}
