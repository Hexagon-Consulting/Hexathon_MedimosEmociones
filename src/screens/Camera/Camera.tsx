import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { 
	Text, 
	TouchableOpacity, 
	useColorScheme, 
	View
} from "react-native";
import { Camera, useCameraDevices } from "react-native-vision-camera";


import {bgColor, colors, fonts, layout, m, mx, my} from '../../styles/styles';

const PopUp = ({
	message
}: {
	message: string,
}) => {
	const colorScheme = useColorScheme() || 'light';

	return <View style={{
		height: '100%',
		width: '100%',
		position: 'absolute',
		backgroundColor: colors[colorScheme].text + '4',
	}}>
		<View style={{
			margin: 64,
			backgroundColor: colors[colorScheme].background,
			borderRadius: 24,
			padding: 16,
		}}>
			<Text style={[
				fonts[colorScheme].p,
			]}
			>{message}</Text>
		</View>
	</View>
}

const CameraScreen: React.FC = () => {
	const colorScheme = useColorScheme() || 'light';
	const isFocused = useIsFocused();
	const devices = useCameraDevices();
	const camera = useRef<Camera>(null);

	const [showCamera, setShowCamera] = useState<boolean>(false);
	const [alertMessage, setAlertMessage] = useState<string>('');

	const openCamera = async () => {
		console.log('Checking devices...')
		if (!devices.front && !devices.back) {
			setAlertMessage('No se han encontrado cámaras integradas en el dispositivo.');
			setShowCamera(false);
			return;
		}

		console.log('Checking camera permission...');
		const cameraPermission = await Camera.getCameraPermissionStatus();
		console.log('Permission:', cameraPermission);
		switch (cameraPermission) {
			case 'authorized':
			case 'restricted':
				setAlertMessage('');
				setShowCamera(true);
				break;
			case 'denied':
				setAlertMessage('No se ha dado el permiso necesario de la Cámara.');
				setShowCamera(false);
				break;
			case 'not-determined':
				setAlertMessage('Se han solicitado los permisos para utilizar la Cámara.');
				const newCameraPermission = await Camera.requestCameraPermission();
				if (newCameraPermission === 'authorized') {
					setAlertMessage('');
					setShowCamera(true);
				}
				else {
					setAlertMessage('No se ha dado el permiso necesario de la Cámara.');
					setShowCamera(false);
				}
				break;
		}
	};

	const takeSnapshot = async () => {
		return await camera.current?.takeSnapshot({
			quality: 85,
			skipMetadata: true,
		});
	}

	useEffect(() => {
		if (isFocused) {
			openCamera();
		}
	},[isFocused, devices]);

	return (
		<View style={[
			layout.flexFill, 
			bgColor(colors[colorScheme].background),
		]}>
			{
				showCamera
				? <>
					<Camera ref={camera}
						device={devices.front!! || devices.front!!}
						isActive={true} style={{flex: 1}} photo={true}
					/>
					<TouchableOpacity 
						onPress={() => console.log('Taking photo..')}
					><View 
					style={{
						backgroundColor: 'white',
						borderRadius: 32,
						position: 'absolute',
						height: 64,
						width: 64,
						bottom: 16,
						alignSelf: 'center'
					}}
					/></TouchableOpacity>
				</>
				: null
			}
			{
				alertMessage
				? <PopUp message={alertMessage} /> : null
			}
		</View>
	);
}

export default CameraScreen;