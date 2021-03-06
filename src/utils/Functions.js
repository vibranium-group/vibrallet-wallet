import RNFS from 'react-native-fs'
import { showMessage } from "react-native-flash-message";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Share, Platform } from 'react-native'
import * as Network from 'expo-network';
const CryptoJS = require("crypto-js")


const SECRET = 'bitrasecret'
export function decrypt(text) {
  try {
    var bytes = CryptoJS.AES.decrypt(text, SECRET);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText
  } catch (e) {
    console.error(e)
  }
}

export function encrypt(text) {
  try {
    let originalText = CryptoJS.AES.encrypt(text, SECRET).toString();
    return originalText
  } catch (e) {
    console.log(e)
  }
}


export function share(title = '', msg = '', url = 'https://app.vibrallet.com') {
  try {
    Share.share(
      {
        ...Platform.select({
          ios: {
            message: title + '\n' + (msg || '') + '\n' + (url || ''),
          },
          android: {
            message: title + '\n' + (msg || '') + '\n' + (url || ''),
          },
        }),
        title: title,
        // url: url && url !== '' ? url : null, 
      },
      {
        ...Platform.select({
          ios: {
            // iOS only: 
            excludedActivityTypes: ['com.apple.UIKit.activity.PostToTwitter'],
          },
          android: {
            // Android only: 
            dialogTitle: "Share",
          },
        }),
      },
    );
  } catch (e) {
    console.error(e);
  }
}

export const setToStorage = async (title, data) => await AsyncStorage.setItem(title, data)

export const getToken = async () => {
  try {
    const appToken = await AsyncStorage.getItem("appToken")
    if (appToken)
      return JSON.parse(appToken)
    else
      return null
  } catch (e) {
    console.log('error to get token', e)
  }
}

export const setToken = token => {
  AsyncStorage.setItem("appToken", JSON.stringify(token))
}


export const gettingBackup = (toBackUp, text = "Your wallet backup has been created in your downloads") => {
  const path = RNFS.DownloadDirectoryPath + `/vibranium-backup-${new Date().getTime()}.json`;
  RNFS.writeFile(path, JSON.stringify(encrypt(toBackUp)), 'utf8')
    .then((success) => {
      showMessage({
        message: text,
        description: null,
        type: 'success',
        icon: null,
        duration: 3000,
        style: { backgroundColor: "#16a085" },
        position: 'top'
      })
      return true
    })
    .catch((err) => {
      console.log('Error in backup process', err.message);
      return false
    });
}



/**
 * Returns a status of the internet connection
 * @return {Boolean} 
 */
export const checkNetworkStauts = () => {
  return new Promise((resolve, reject) => {
    Network.getNetworkStateAsync().then(status => {
      if (!status.isConnected) {
        showMessage({
          message: 'Network connection not detected , please connect your phone to the internet connection and try again',
          description: null,
          type: 'danger',
          icon: null,
          duration: 8000,
          style: { backgroundColor: "red" },
          position: 'top'
        })
      }
      resolve(status.isConnected)
    })
  })

}