import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { View } from 'react-native'
import AppButton from '../../../components/common/AppButton'
import AppText from '../../../components/common/AppText'
import ControllerAppInput from '../../../components/common/ControllerAppInput/ControllerAppInput'
import HR from '../../../components/common/HR/HR'
import NewWalletListItem from '../../../components/Profile/NewWalletListItem'
import Screen from '../../../components/Screen'
import AppInput from '../../../components/common/AppInput/AppInput'
import { globalStyles } from '../../../config/styles'
import { validators } from '../../../utils/validators'
import { yupResolver } from '@hookform/resolvers/yup'
import { routes } from '../../../config/routes'
import { useDispatch, useSelector } from 'react-redux'
import { initCreateWallet } from '../../../redux/modules/wallets'
import { navigateToWallet } from '../../../redux/modules/appSettings'
import HideKeyboard from '../../../utils/HideKeyboard'

const walletNameSchema = yup.object({
	walletName: validators.string(true),
})

export default function NewWallet({ navigation, route }) {
	const dispatch = useDispatch()
	const [suggestedName, setSuggestedName] = useState('')
	const [error, setError] = useState(false)
	const { no_back } = route.params || {}
	const walletName = useSelector(state => state.wallets?.create?.name)
	const items = useMemo(() => [
		'My Wallet',
		'BTC Wallet',
		'ETH Wallet',
		'HODI Wallet',
	])


	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(walletNameSchema),
	})

	useEffect(() => {
		if (no_back) {
			navigation.setOptions({ headerLeft: null })
		}

		dispatch(navigateToWallet(false))
	}, [])

	const onSubmit = value => {
		// console.log('on submit', value)
		console.log('debug submit 2', suggestedName)
		console.log('debug submit 3', value)
		// alert('A1 ' + value.walletName)
		// console.log('on submit 3', value.walletName)

		// dispatch(initCreateWallet(value.walletName))
		// navigation.navigate(routes.setPincode)
		// navigation.navigate(routes.wordBackup)
	}


	const handleSelectName = title => {
		setSuggestedName(title)
	}

	const submitHandler = () => {

		if (suggestedName.length === 0) {
			setError(true)
			return
		}
		else {
			dispatch(initCreateWallet(suggestedName))
			navigation.navigate(routes.wordBackup)
		}

		// console.log('final input', suggestedName)
		// dispatch(initCreateWallet(value.walletName))
		// navigation.navigate(routes.setPincode)
		// navigation.navigate(routes.wordBackup)
	}

	return (
		<Screen
			edges={['bottom']}
			style={{ ...globalStyles.screen, paddingHorizontal: 18 }}
		>
			<HideKeyboard>
				<View style={{ flex: 1 }}>
					<View style={{ flex: 1 }}>
						<ControllerAppInput
							name="walletName"
							errors={error}
							control={control}
							icon="wallet"
							defaultValue={suggestedName}
							placeholder="Type your wallet name"
							// onSubmitEditing={handleSubmit(onSubmit)}
							onSubmitEditing={submitHandler}
							value={suggestedName}
							onChangeText={text => {
								setSuggestedName(text)
								setError(false)
							}}
						/>
						<View
							style={{
								marginVertical: 18,
								borderStyle: 'solid',
								borderWidth: 1,
								borderColor: globalStyles.Colors.inputColor,
								borderRadius: 10,
							}}
						>
							{/* TODO: Suggested name should be working by selecting */}
							<AppText bold style={{ padding: 18 }}>
								Suggested Names:
							</AppText>
							{items.map((item, i) => (
								<View key={i}>
									<NewWalletListItem onSelect={handleSelectName} title={item} />
									{i + 1 === items.length ? null : <HR />}
								</View>
							))}
						</View>
					</View>
					<AppButton
						title={'Next'}
						style={{ fontWeight: 'bold' }}
						// onPress={handleSubmit(onSubmit)}
						onPress={submitHandler}
					/>
				</View>
			</HideKeyboard>
		</Screen>
	)
}
