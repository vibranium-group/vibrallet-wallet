import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import { globalStyles } from '../../../config/styles'
import { Context } from '../../../context/Provider'

const DAppExchangesScreen = () => {
  // const { MarketListing } = useContext(Context)
  return (
    <View style={globalStyles.screen}>
      <Text>This is DAppExchangesScreen</Text>
    </View>
  )
}


export default DAppExchangesScreen