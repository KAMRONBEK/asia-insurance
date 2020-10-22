/**
 * Imports
 */

import { createIconSetFromIcoMoon } from "react-native-vector-icons";
import selection from "../assets/selection.json";
import { Dimensions } from "react-native";
import { strings } from "../locales/strings";
import images from "../assets/images";

/**
 * Icons
 */
const Icons = createIconSetFromIcoMoon(selection);

/**
 * Colors
 */

let colors = {
	darkBlue: "#13509D",
	darkBlueText: "#313141",
	grayText: "#737387",
	darkGray: "#858585",
	red: "#E2672E",
	black: "#313141",
	gray: "#B1B1BF",
	lightBlue: "#216ECF",
	green: "#7AA57E",
	white: "#fff",
	ultraLightBlue: "#F3F3F9",
	ultraLightDark: "#F8F8F8",
	paleGray: "#E8E4E4",
};

/**
 * Screens
 */

enum SCREENS {
	history = "History",
	loader = "Loader",
	sos = "SOS",
	payments = "Payments",
	support = "Support",
	profile = "Profile",
	auth = "Auth",
	tabs = "Tabs",
	aboutInsurance = "AboutInsurance",
	calculateCost = "CalculateCost",
	products = "Products",
	helpRequest = "HelpRequest",
	payouts = "Payouts",
	selection = "Selection",
	cost = "Cost",
	policy = "Policy",
	policyCheck = "PolicyCheck",
	transactions = "Transactions",
	historyStack = "HistoryStack",
	sosStack = "SOSStack",
	supportStack = "SupportStack",
	profileStack = "ProfileStack",
	productsStack = "ProductsStack",
	policySelect = "PolicySelect",
	contactToTechSupport = "ContactToTechSupport",
	news = "News",
	checkout = "Checkout",
	pin = "Pin",
	map = "Map",
}

export const deviceWidth = Dimensions.get("window").width;
export const deviceHeight = Dimensions.get("window").height;

export const CONTAINER_PADDING = 15;
export const BORDER_RADIUS = 10;
export const BIG_BORDER_RADIUS = 20;

export const LATITUDE_DELTA = 0.01;
export const LONGITUDE_DELTA = 0.01;

export { Icons, colors, SCREENS };

//insurance-menus
export const aboutDatas = [
	{
		insuranceType: strings.osago,
		desc: strings.osagoInfo,
		image: images.carHand,
		firstTitle: strings.insuranceTerms,
		firstDesc: strings.insuranceTermsInfo,
		secondTitle: strings.additionalInfo,
		secondDesc: strings.insuranceAdditionalInfo,
	},
	{
		insuranceType: strings.vzr,
		desc: strings.vzrInfo,
		image: images.planeHand,
		firstTitle: strings.whatWeOffer,
		firstDesc: strings.whatWeOfferInfo,
		secondTitle: strings.additionalInfo,
		secondDesc: strings.foreignInsuranceAdditionalInfo,
	},
];
