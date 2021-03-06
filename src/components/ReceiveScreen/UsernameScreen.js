import React, { useContext } from 'react'
import { View, Image, ScrollView, TouchableOpacity } from 'react-native'
import { Images } from '../../assets'
import { globalStyles } from '../../config/styles'
import AppButton from '../common/AppButton'
import AppIcon from '../common/AppIcon'
import AppInput from '../common/AppInput/AppInput'
import AppText from '../common/AppText'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Context } from '../../context/Provider'
import Entypo from 'react-native-vector-icons/Entypo'
import { showMessage } from 'react-native-flash-message'
import Clipboard from '@react-native-community/clipboard'

export default function UsernameScreen({ route }) {
	const { coin } = route.params || {}

	const { user: userProvider, userProfile } = useContext(Context)

	return (
		<View style={{ ...globalStyles.gapScreen }}>
			<ScrollView>
				<View style={{ marginTop: 40, marginBottom: 20 }}>
					<View style={{ ...globalStyles.flex.center }}>
						<FontAwesome5
							size={20}
							name="info-circle"
							color={globalStyles.Colors.text3}
						/>
					</View>
					<View
						style={{
							marginVertical: 12,
							...globalStyles.flex.center,
						}}
					>
						<AppText color="text2">
							With username you choose in Profile section,
						</AppText>
						<AppText color="text2">
							You can recieve and send coins from other
						</AppText>
						<AppText color="text2">Vibranium wallets.</AppText>
					</View>
				</View>
				<View style={{ ...globalStyles.flex.center }}>
					{/* <Image source={Images.avatar3} style={{ marginVertical: 12 }} /> */}
					{userProfile ? <Image source={{ uri: `${userProfile}` }} style={{ width: 80, height: 80, borderRadius: 50 }} /> : <Entypo
						name="user"
						size={80}
						color={globalStyles.Colors.text2}
					/>}
					<AppText bold typo="md">
						{userProvider.username ? userProvider.username : 'Login'}
					</AppText>
					{userProvider.username && <TouchableOpacity onPress={() => {
						if (userProvider.username) {
							Clipboard.setString(userProvider.username)
							showMessage({
								message: `Copied to your Clipboard`,
								description: null,
								type: 'success',
								icon: null,
								duration: 2000,
								style: { backgroundColor: "#27BF74" },
								position: 'top'
							})
						} else {
							showMessage({
								message: `User name is not set.`,
								description: null,
								type: 'success',
								icon: null,
								duration: 2500,
								style: { backgroundColor: "#F84837" },
								position: 'top'
							})
						}
					}}>
						<AppText typo="dot" color="text3">
							Click to copy
						</AppText>
					</TouchableOpacity>}

				</View>
				<View style={{ marginVertical: 30, flex: 1 }}>
					<AppInput
						endText="Set"
						keyboardType="numeric"
						label="Advanced"
						placeholder={`Set ${coin.name} amount`}
					/>
				</View>
			</ScrollView>
			<View
				style={{ ...globalStyles.flex.row, justifyContent: 'space-between' }}
			>
				<AppButton
					bold
					title="Share"
					customStyle={{
						flex: 0.48,
						fontWeight: 'bold',
						backgroundColor: globalStyles.Colors.bckColor,
						borderWidth: 1,
						borderColor: globalStyles.Colors.inputColor,
					}}
				/>
				<AppButton
					title="Copy"
					customStyle={{ flex: 0.48, fontWeight: 'bold' }}
				/>
			</View>
		</View>
	)
}
