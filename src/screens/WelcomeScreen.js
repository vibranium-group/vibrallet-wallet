import React, { useEffect, usef } from 'react'
import { StyleSheet, View, Image, BackHandler } from 'react-native'
import Screen from '../components/Screen'

import AppButton from '../components/common/AppButton'
import AppText from '../components/common/AppText'

import globalStyles from './../config/styles'
import { routes } from '../config/routes'
import SvgUri from 'react-native-svg-uri'
import { useDispatch } from 'react-redux'
import { setLoggedIn } from '../redux/modules/appSettings'
import { CommonActions } from '@react-navigation/routers'
import { useFocusEffect } from '@react-navigation/native'
const defaultStyles = globalStyles()

const WelcomeScreen = ({ navigation }) => {
	const dispatch = useDispatch()
	const handleCreateNewWallet = () => {
		// TODO: refactor setLoggedIn
		dispatch(setLoggedIn(true))
		navigation.navigate(routes.newWallet)
	}


	useEffect(() => {
		BackHandler.addEventListener('hardwareBackPress', async () => {
			// this.goBack(); // works best when the goBack is async
			return false;
		});
	}, [])

	// useFocusEffect(
	// 	React.useCallback(() => {
	// 		const onBackPress = () => {
	// 			if (isSelectionModeEnabled()) {
	// 				disableSelectionMode();
	// 				return true;
	// 			} else {
	// 				return false;
	// 			}
	// 		};

	// 		BackHandler.addEventListener('hardwareBackPress', onBackPress);

	// 		return () =>
	// 			BackHandler.removeEventListener('hardwareBackPress', onBackPress);
	// 	}, [isSelectionModeEnabled, disableSelectionMode])
	// );

	// useEffect(() => {
	// 	navigation.addListener('beforeRemove', (e) => {
	// 		e.preventDefault();
	// 	})
	// }, [])

	return (
		<Screen style={defaultStyles.screen}>
			<View style={[styles.screenContainer]}>
				<View
					style={{
						flex: 4,
						...defaultStyles.flex.center,
					}}
				>
					<SvgUri
						style={styles.interLogo}
						source={defaultStyles.Images.introImage}
						resizeMode="contain"
					/>
				</View>

				<View style={[styles.binrexContainer]}>
					<Image
						fadeDuration={300}
						style={styles.binrexLogo}
						source={defaultStyles.Images.vib_starterLogoSub}
						resizeMethod="auto"
						resizeMode="contain"
					/>
					<AppText typo="xs" style={styles.binrexText}>
						The only crypto wallet yo can trust and manage your assets.
					</AppText>
				</View>

				<View style={styles.buttons}>
					<AppButton
						typo="sm"
						title="Create New Wallet"
						onPress={handleCreateNewWallet}
					/>
					<AppButton
						typo="xs"
						title="I Already Have A Wallet"
						color={defaultStyles.Colors.inputColor}
						customStyle={styles.walletButton}
						onPress={() => navigation.navigate(routes.restore)}
					/>
				</View>
			</View>
		</Screen>
	)
}

const styles = StyleSheet.create({
	screenContainer: {
		flex: 1,
		padding: 10,
	},
	binrexContainer: {
		flex: 2,
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	interLogo: {
		alignSelf: 'center',
		height: '100%',
		...defaultStyles.flex.center,
	},
	binrexLogo: {
		marginTop: 10,
		alignSelf: 'center',
		height: 50,
	},
	binrexText: {
		textAlign: 'center',
		padding: 10,
		color: defaultStyles.Colors.textColor,
	},
	buttons: {
		// flex: 2,
	},
	buttonsContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
	},
	walletButton: {
		backgroundColor: defaultStyles.Colors.bckColor,
		borderWidth: 1,
		borderColor: defaultStyles.Colors.inputColor,
	},
})

export default WelcomeScreen
