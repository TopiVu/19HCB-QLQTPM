import AsyncStorage from '@react-native-community/async-storage'


export async function getAppConfig() {
  let result: any = {}
  try {
    const allKeys = await AsyncStorage.getAllKeys()
    const value = await AsyncStorage.multiGet(allKeys.filter(i => isNaN(Number(i))))
    const mapping = value.reduce((res, pair) => {
      let value
      try {
        value = JSON.parse(pair[1])
      } catch (error) {
        value = pair[1]
      }
      return {
        ...res,
        [pair[0]]: value
      }
    }, {})
    if (mapping !== null) {
      // We have data!!
      result = mapping || {}
    }
    return result
  } catch (error) {
    return result
  }
}

export async function saveAppConfig(configs: any) {
  try {
    AsyncStorage.multiSet(Object.keys(configs).map(name => [name, ['string', 'number'].indexOf(typeof configs[name]) === -1 ? JSON.stringify(configs[name]) : configs[name].toString()]))
  } catch (error) {
    console.log('error AsyncStorage',error)
  }
}

export async function clearAppConfig(configs: any, replace?: boolean) {
  try {
    if (replace) {
      AsyncStorage.clear().then(() => {
        AsyncStorage.multiSet(Object.keys(configs).map(name => [name, ['string', 'number'].indexOf(typeof configs[name]) === -1 ? JSON.stringify(configs[name]) : configs[name].toString()]))
      })
    } else {
      AsyncStorage.multiRemove(Object.keys(configs))
    }
  } catch (error) {
    console.log('error AsyncStorage',error)
  }
}
