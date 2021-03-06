import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Images } from '../../assets'
import { globalStyles } from '../../config/styles'
import AppText from '../common/AppText'
import Timer from './Timer'
import CountDown from 'react-native-countdown-component';
export default function ComingSoon({ details, time, imageName }) {
	return (
		<View style={styles.container}>
			<View
				style={{
					flex: 3,
					alignItems: 'center',
					justifyContent: 'space-evenly',
				}}
			>
				<AppText typo="lg" bold style={styles.title}>
					COMING SOON!
				</AppText>
				<Image style={styles.image} source={Images[imageName]} />
			</View>
			<View
				style={{ flex: 1, paddingHorizontal: 40, ...globalStyles.flex.center }}
			>
				<AppText typo="tiny" style={{ textAlign: 'center', color: '#95949A' }}>{details}</AppText>
			</View>
			<View style={{ flex: 2 }}>
				<CountDown
					digitStyle={{ backgroundColor: '#FFF', marginHorizontal: 10 }}
					showSeparator
					separatorStyle={{ color: '#95949A', alignSelf: 'center', marginBottom: 20 }}
					until={20 * 400 * 60 * 10 + 30}
					size={20}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	title: {
		alignSelf: 'center',
	},
	image: {
		alignSelf: 'center',
	},
})
