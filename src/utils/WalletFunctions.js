import AsyncStorage from '@react-native-async-storage/async-storage'
import bitcoinManager from '../blockchains/BitcoinManager'
import bscManager from '../blockchains/BscManager'
import ethManager from '../blockchains/EthManager'
import { persist_root } from './../config/async-storage.json'

/**
 * Returns a promise that resolves to the value of the stored mnemonic
 * @return {Promise}
 */
export const getStoredMnemonic = async () => {
	const persist = await AsyncStorage.getItem(persist_root)
	if (persist !== null) {
		let item = JSON.parse(persist)
		if (item !== null) {
			let wallets = JSON.parse(item['wallets'])
			return wallets.data ? wallets.data[0] : null
		}
	}
}

/**
 * Returns a boolean promise that resolves to the value of the existing wallet
 * @return {Promise}
 */
export const checkExistsWallet = async () => {
	const persist = await AsyncStorage.getItem(persist_root)
	if (persist) {
		let persistObj = JSON.parse(persist)
		const wallets = JSON.parse(persistObj['wallets'])
		if (wallets.data && wallets['data'].length > 0) {
			return true
		} else {
			return false
		}
	}
}

/**
 * Returns a decimal promise that value of the coin
 * @return {Promise}
 */
export const getCoinBalance = async coin => {
	if (!coin) return 0

	if (checkExistsWallet()) {
		try {
			let balance = 0
			const coinManager = {
				ETH: ethManager,
				BNB: bscManager,
				BTC: bitcoinManager,
			}
			let selectedCoin = coinManager[coin.symbol]
			balance = await selectedCoin.getBalance(coin.address, false)

			if (!balance) return 0
			if (balance == undefined) return 0

			return balance
		} catch (err) {
			console.log('Wallet Function get Coin Balance from Network ', err)
		}
	} else return 0
}

export const getCoinBalanceFromNetwork = coin => {
	let balance = 0
	// getCoinBalance(coin)
	// 	.then(res => {
	// 		balance = res
	// 	})
	// 	.catch(err => {
	// 		console.log('getCoinBalanceFromNetwork', err)
	// 	})
	return balance
}
