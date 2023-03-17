/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { PropsWithChildren, useEffect } from 'react';
import {
  StatusBar,
  Text,
  useColorScheme,
	View,
} from 'react-native';

import SplashScreen from 'react-native-splash-screen';
import LinearGradient from 'react-native-linear-gradient';
import { colors, gradients, layout } from './src/styles/styles';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

// Bottom Tab Navigator
const MainTab = createBottomTabNavigator();

const MainView: React.FC = ({children}: PropsWithChildren)  => {
	const isDarkMode = useColorScheme() === 'dark';
	const colorScheme = useColorScheme() || 'light';
	const insets = useSafeAreaInsets();

	return (
		<View style={[layout.flexFill, {
				borderRadius: 24,
				paddingHorizontal: 8,
				paddingVertical: 16,
				backgroundColor: colors[colorScheme].background,
				marginTop: insets.top,
				marginBottom: insets.bottom,
				marginLeft: insets.left,
				marginRight: insets.right,
			}]}>
				{/* <Icon name='md-home' color={colors[colorScheme].text} size={25}/> */}
				<Text style={{
					color: colors[colorScheme].text,
				}}>Hello Hexagon!</Text>
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
				name='Main'
				component={MainView}
				options={{
					// tabBarIcon: ({focused, color, size})=>{
					// 	// const iconName = focused ? 'home-filled' : 'home-outline';
					// 	// return <Icon name={iconName} color={color} size={size}/>;
					// },
				}}
				
			/>
		</MainTab.Navigator>
	);
}

function App(): JSX.Element {
	useEffect(()=>{
		SplashScreen.hide();
	},[]);

  return (
		<SafeAreaProvider>
			<NavigationContainer>
				<View style={{flex: 1, backgroundColor: '#000'}}>
					<StatusBar
						barStyle={'light-content'}
						backgroundColor={'#000'}
					/>
					<MainNavigator/>
				</View>
			</NavigationContainer>
		</SafeAreaProvider>
  );
}

export default App;
