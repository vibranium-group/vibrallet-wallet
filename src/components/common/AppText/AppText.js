import React from 'react'
import { Text, StyleSheet } from 'react-native'
import globalStyles, { setColor, setTypo } from '../../../config/styles'

const defaultStyles = globalStyles()

const AppText = ({ children, style, typo, bold, color, ...otherProps }) => {
	return (
		<Text
			style={[
				styles.appText,
				setTypo(typo),
				setColor(color),
				bold ? styles.bold : {},
				style,
			]}
			{...otherProps}
		>
			{children}
		</Text>
	)
}
const styles = StyleSheet.create({
	appText: {
		fontFamily: 'Roboto-Regular',
	},
	bold: {
		// fontWeight: '500',
		fontFamily: 'Roboto-Medium'
	},
})

export default AppText
