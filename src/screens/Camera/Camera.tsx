import { useIsFocused } from "@react-navigation/native";
import React, { useEffect } from "react";
import { 
	Text, 
	useColorScheme, 
	View
} from "react-native";

import {bgColor, colors, fonts, layout, m, mx, my} from '../../styles/styles';

const Camera: React.FC = () => {
	const colorScheme = useColorScheme() || 'light';
	const isFocused = useIsFocused();

	useEffect(() => {
		if (isFocused) {
			
		}
	},[isFocused])

	return (
		<View style={[
			layout.flexFill, 
			bgColor(colors[colorScheme].background),
			mx(8), my(16),
		]}>
			<Text style={[
				fonts[colorScheme].p,
			]}>
				Camera Screen
			</Text>

		</View>
	);
}

export default Camera;