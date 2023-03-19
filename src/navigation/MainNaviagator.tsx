import React, { PropsWithChildren, useEffect } from 'react';
import {
  Text,
  useColorScheme,
	View,
} from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { colors, layout } from '../styles/styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SignIn from '../screens/SignIn';
import Home from '../screens/Home';
// Bottom Tab Navigator
const MainTab = createBottomTabNavigator();

const MainView: React.FC<PropsWithChildren> = ({children}: PropsWithChildren)  => {
	const isDarkMode = useColorScheme() === 'dark';
	const colorScheme = useColorScheme() || 'light';
	const insets = useSafeAreaInsets();

	return (
		<View style={[layout.flexFill, {
				borderRadius: 24,
				backgroundColor: colors[colorScheme].background,
				marginTop: insets.top,
				marginBottom: insets.bottom,
				marginLeft: insets.left,
				marginRight: insets.right,
				overflow: 'hidden',
			}]}>
				{children}
		</View>
	);
}

function MainNavigator({children}: PropsWithChildren): JSX.Element {
	const colorScheme = useColorScheme() || 'light';

	return (
		<MainTab.Navigator
			// safeAreaInsets={insets}
			screenOptions={{
				tabBarShowLabel: false,
				tabBarStyle: {
					backgroundColor: '#0000',
					shadowOpacity: 0,
					shadowColor: '#0000',
					height: 56,
					borderColor: '#0000',
					borderWidth: 0,
					elevation: 0,
					margin: 0,
				},
				headerShown: false,
			}}
			sceneContainerStyle={{
				backgroundColor: '#0000',
				borderColor: '#0000',
				borderWidth: 0,
			}}
		>
			<MainTab.Screen
				name='Login'
				children={
					() => <MainView>
						<SignIn/>
					</MainView>
				}
				options={{
					tabBarIcon: ({focused})=>{
						if (focused) return <IonIcon name='person' color='white' size={24} />
						return <IonIcon name='person-outline' color='white' size={24} />
					},
				}}
			/>
			<MainTab.Screen
				name='Home'
				children={
					() => <MainView>
						<Home/>
					</MainView>
				}
				options={{
					tabBarIcon: ({focused})=>{
						if (focused) return <IonIcon name='home' color='white' size={24} />
						return <IonIcon name='home-outline' color='white' size={24} />
					},
				}}
			/>
		</MainTab.Navigator>
	);
}

export default MainNavigator;