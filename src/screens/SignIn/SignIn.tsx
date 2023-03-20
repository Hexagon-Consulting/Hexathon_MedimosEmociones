import React from "react";
import { 
	Text, 
	useColorScheme, 
	View
} from "react-native";
import Divider from "../../components/Divider/Divider";

import {bgColor, colors, fonts, layout, m, mx, my} from '../../styles/styles';

const SignIn: React.FC = () => {
	const colorScheme = useColorScheme() || 'light';

	return (
		<View style={[
			layout.flexFill, 
			bgColor(colors[colorScheme].background),
			mx(8), my(16),
		]}>
			<Text style={[
				fonts[colorScheme].h1,
			]}>
				Sign In Screen
			</Text>
			<Divider/>
			<Text
				style={[fonts[colorScheme].p]}
			>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore velit qui hic eaque nulla distinctio nihil ab, labore magni eveniet suscipit sed possimus pariatur modi fugiat autem saepe provident neque.
			</Text>
		</View>
	);
}

export default SignIn;