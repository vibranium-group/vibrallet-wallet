import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, useCallback, useEffect, useState } from 'react'
import HttpService from '../services/HttpService'
import { useQuery } from "react-query";

export const Context = createContext()

const MarketProvider = props => {

  const [state, setState] = useState({
    // FCASList: [],
    // FCASSort: 'name',
    // MarketListing: [],
    // MarketListingSort: 'name',
    // MarketListingPageSize: 200,
    // MarketListingPageNumber: 1,
    // MarketingFilter: 'btc'
  })
  // const [favCoins, setFavCoins] = useState([])
  // const [fcasFavCoins, setFcasFavCoins] = useState([])


  // useEffect(() => {
  //   AsyncStorage.getItem("marketFavCoins").then(res => {
  //     setFavCoins(JSON.parse(res))
  //   }).catch(error => {
  //     console.log('error form Market FAV coins', error)
  //   })
  // }, [])


  // useEffect(() => {
  //   if (favCoins !== null) {
  //     AsyncStorage.setItem("marketFavCoins", JSON.stringify(favCoins))
  //   }
  // }, [favCoins])


  // useEffect(() => {
  //   AsyncStorage.getItem(FCAS_FAV_COINS_STORAGE).then(res => {
  //     setFcasFavCoins(JSON.parse(res))
  //   }).catch(err => {
  //     console.log('error get from storage FCAS')
  //   })
  // }, [])


  // useEffect(() => {
  //   if (fcasFavCoins !== null) {
  //     AsyncStorage.setItem(FCAS_FAV_COINS_STORAGE, JSON.stringify(fcasFavCoins))
  //   }
  // }, [fcasFavCoins])

  // useEffect(() => {
  //   fetchData()
  //   fetchFCASData()
  // }, [])


  // // ============================================================

  // const dispatch = value => {
  //   setState({ ...state, ...value })
  // }



  // const setMarketSearchFilter = (text) => {
  //   setState({ ...state, MarketingFilter: text })
  // }

  // const adder = (item) => {
  //   // AsyncStorage.getItem("marketFavCoins").then(data => {
  //   //   if (data === null) {
  //   //     AsyncStorage.setItem('marketFavCoins', JSON.stringify([]))
  //   //   }
  //   // })
  //   const index = favCoins.findIndex((itm) => itm.symbol === item.symbol)
  //   if (index < 0) {
  //     setFavCoins([...favCoins, item])
  //   } else {
  //     setFavCoins(favCoins.splice(index, 1))
  //   }
  // }

  // const deleteFav = (item) => {
  //   const index = favCoins.findIndex((itm) => itm.symbol === item.symbol)
  //   if (index >= 0) {
  //     setFavCoins(favCoins.splice(index, 1))
  //   }
  // }

  // const FCAS_FAV_COINS_STORAGE = 'FCAS_FAV_COIN_STORAGE'
  // const adderFCASFAV = (item) => {
  //   const index = fcasFavCoins.findIndex((itm) => itm.symbol === item.symbol)
  //   if (index < 0) {
  //     setFcasFavCoins([...fcasFavCoins, item])
  //   } else {
  //     setFcasFavCoins(fcasFavCoins.splice(index, 1))
  //   }

  // }

  // const deleteFCASFav = (item) => {
  //   const index = fcasFavCoins.findIndex((itm) => itm.symbol === item.symbol)
  //   if (index >= 0) {
  //     setFavCoins(fcasFavCoins.splice(index, 1))
  //   }
  // }


  // const marketPagination = (page) => {
  //   setState((state) => {
  //     state.MarketListingPageNumber += page
  //     return { ...state }
  //   })
  //   fetchData()
  // }

  // const changeFCASSort = (sort) => {
  //   setState((state) => {
  //     state.FCASSort = sort
  //     return { ...state }
  //   })
  //   fetchData()
  // }

  // const changeMarketSort = (sort) => {
  //   setState((state) => {
  //     state.MarketListingSort = sort
  //     return { ...state }
  //   })
  //   fetchData()
  // }

  // // ==========================================


  // const fetchFCAS = () => {
  //   let data = []
  //   new HttpService(
  //     "", {
  //     "uniqueId": "123",
  //     "action": "fcasListing",
  //     "data": {
  //       "pageSize": 5,
  //       "pageNumber": 1,
  //       "sort": "name"
  //     }
  //   }
  //   ).Post(response => {
  //     data = response
  //   })
  //   return data
  // };

  // // const { isLoading, error, data, isFetching } = useQuery("repoData", fetchFCAS)


  // // ==========================================



  // const fetchData = useCallback(() => {
  //   // const { isLoading, error, data, isFetching } = useQuery("repoData", fetchFCAS)
  //   // console.log('fucker data', data)
  //   new HttpService(
  //     "", {
  //     "uniqueId": "123",
  //     "action": "marketListing",
  //     "data": {
  //       "pageSize": state.MarketListingPageSize,
  //       "pageNumber": 1,
  //       "sort": state.MarketListingSort,
  //       // "filter": "btc"
  //     }
  //   }
  //   ).Post(response => {
  //     if (response) {
  //       setState((state) => {
  //         state.MarketListing = response
  //         return { ...state }
  //       })

  //     }
  //   })
  // }, [state])


  // const fetchFCASData = useCallback(() => {




  //   new HttpService(
  //     "", {
  //     "uniqueId": "123",
  //     "action": "fcasListing",
  //     "data": {
  //       "pageSize": 50,
  //       "pageNumber": 1,
  //       "sort": state.FCASSort
  //     }
  //   }
  //   ).Post(response => {
  //     if (response) {

  //       const items = response.map(item => {

  //         new HttpService("",
  //           {
  //             "uniqueId": "123",
  //             "action": "priceChart",
  //             "data": {
  //               "symbol": `${item.symbol}`,
  //               "timeframe": "30m",
  //               "limit": 440,
  //               "responseType": "url",
  //               "height": 50,
  //               "width": 250,
  //             }
  //           }).Post(res => {
  //             if (res?.success === true) {
  //               item.svgUri = res.data.url
  //             }
  //           })
  //         return item
  //       })

  //       setState((state) => {
  //         state.FCASList = items
  //         return { ...state }
  //       })


  //     }
  //   })
  // }, [state])

  return <Context.Provider
    value={{ ...state, adder, deleteFav, favCoins, fcasFavCoins, adderFCASFAV, deleteFCASFav, dispatch, changeMarketSort, marketPagination, changeFCASSort, setMarketSearchFilter }}>
    {props.children}
  </Context.Provider>

}


export default MarketProvider