import React, { useEffect } from "react";
import {
	View,
	StatusBar,
	StyleSheet,
	ScrollView,
	FlatList,
	TouchableWithoutFeedback,
} from "react-native";
import { colors, CONTAINER_PADDING, SCREENS } from "../../../constants";
import Text from "../../../components/common/Text";
import OrderCard from "../../../components/card/OrderCard";
import { strings } from "../../../locales/strings";
import images from "../../../assets/images";

interface HistoryProps {
	navigation: string;
}

const History = ({ navigation }: HistoryProps) => {
	useEffect(() => {
		StatusBar.setBarStyle("light-content");
		StatusBar.setBackgroundColor(colors.darkBlue);
	}, [navigation]);

	return (
		<View style={styles.container}>
			<ScrollView
				style={{ flex: 1 }}
				contentContainerStyle={styles.plane}
				showsVerticalScrollIndicator={false}
			>
				<OrderCard
					image={images.carShield}
					title={strings.osago}
					id="4364644554"
					status="В обработке"
					currency="сум"
					insurancePrice="200 000"
					policyPrice="112 000"
					date="14.03.2020"
					paymentStatus="Оплачен"
					description="Chevrolet, Captiva, г.Ташкент, 1 год, впервые / отсутствуют, Без ограничений, Без нарушений, Льгот нет"
				/>
				<OrderCard
					image={images.carShield}
					title={strings.osago}
					id="4364644554"
					status="В обработке"
					currency="сум"
					insurancePrice="200 000"
					policyPrice="112 000"
					date="14.03.2020"
					paymentStatus="Оплачен"
					description="Chevrolet, Captiva, г.Ташкент, 1 год, впервые / отсутствуют, Без ограничений, Без нарушений, Льгот нет"
				/>
				<OrderCard
					image={images.carShield}
					title={strings.osago}
					id="4364644554"
					status="Доставлен"
					currency="сум"
					insurancePrice="200 000"
					policyPrice="112 000"
					date="14.03.2020"
					paymentStatus="Оплачен"
					description="Chevrolet, Captiva, г.Ташкент, 1 год, впервые / отсутствуют, Без ограничений, Без нарушений, Льгот нет"
				/>
				<OrderCard
					image={images.carShield}
					title={strings.osago}
					id="4364644554"
					status="Доставлен"
					currency="сум"
					insurancePrice="200 000"
					policyPrice="112 000"
					date="14.03.2020"
					paymentStatus="Оплачен"
					description="Chevrolet, Captiva, г.Ташкент, 1 год, впервые / отсутствуют, Без ограничений, Без нарушений, Льгот нет"
				/>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.ultraLightDark,
	},
	plane: {
		padding: CONTAINER_PADDING,
	},
});

export default History;
