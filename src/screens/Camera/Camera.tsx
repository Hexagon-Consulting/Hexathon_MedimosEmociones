import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { 
	ActivityIndicator,
	Image,
	Text, 
	useColorScheme, 
	View
} from "react-native";
import { Camera, PhotoFile, useCameraDevices } from "react-native-vision-camera";


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

	const [loading, setLoading] = useState(false);
	const [showCamera, setShowCamera] = useState<boolean>(false);
	const [alertMessage, setAlertMessage] = useState<string>('');
	const [currentPhoto, setCurrentPhoto] = useState<PhotoFile | null>(null);

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

	const takeSnapshot = () => {
		console.log('Taking photo..');
		setLoading(true);

		console.log('Camera:', !!camera.current);
		camera.current?.takeSnapshot({
			quality: 85,
			skipMetadata: true,
		}).then( photoTaken => {
			if (photoTaken) {
				setCurrentPhoto(photoTaken);
				setShowCamera(false);
			}
			else {
				setAlertMessage('Hubo un problema al intentar tomar la foto.');
			}
		}).catch(reason => {
			console.log(reason);
		}).finally(() => {
			setLoading(false);
		});

	}

	const testAction = () => {
		console.log('Tested');
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
						onPress={takeSnapshot}
						style={{
							position: 'absolute',
							bottom: 16,
							alignSelf: 'center',
						}}
					>
						<View 
							style={{
								backgroundColor: 'white',
								borderRadius: 36,
							
								height: 72,
								width: 72,
								bottom: 16,
								alignSelf: 'center',
								borderWidth: 8,
								borderColor: '#FFF8'
							}}
						/>
					</TouchableOpacity>
				</>
				: null
			}
			{
				currentPhoto
				? <Image 
					source={{uri: 'file://' + currentPhoto.path}}
					style={{
						flex: 1,
						borderRadius: 20,
						backgroundColor: colors[colorScheme].background,
						padding: 32,
					}}
				/>
				: null
			}
			{
				alertMessage
				? <PopUp message={alertMessage} /> : null
			}
			{
				loading
				? <ActivityIndicator size={128} color={'white'} style={{
					position: 'absolute',
					alignSelf: 'center',
					top: '40%'
				}}/>
				: null
			}
		</View>
	);
}

export default CameraScreen;