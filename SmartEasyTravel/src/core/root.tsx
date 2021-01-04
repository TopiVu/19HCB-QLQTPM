import React from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import App from 'core/navigation'
import { I18nextProvider, translate } from 'react-i18next'
import i18next from 'shared/translate/translate'
import { createEpicMiddleware } from 'redux-observable'
import { mapReducers } from './reducers'
import { persistReducer, persistStore } from 'redux-persist'
import { applyMiddleware, createStore, StoreEnhancer } from 'redux'
import { connect, Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { rootEpic } from './epics'
import AsyncStorage from '@react-native-community/async-storage'
import logger from 'redux-logger'
import { GlobalModal, GlobalModalSetup } from 'shared/components'
import codePush, {CodePushOptions} from "react-native-code-push";
// redux observable config
const epicMiddleware = createEpicMiddleware()
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: []
}
let enhancer: any
if (__DEV__) {
  enhancer = applyMiddleware(epicMiddleware, logger)
} else {
  enhancer = applyMiddleware(epicMiddleware)
}

const persistedReducer = persistReducer(persistConfig, mapReducers)
export const store: any = createStore(persistedReducer, enhancer)
export const persistor = persistStore(store)
epicMiddleware.run(rootEpic as any)
@codePush({
  updateDialog: { 
    title: 'Phiên bản mới',
    appendReleaseDescription: true,
    // descriptionPrefix: 'Hiện đã có phiên bản mới!', // Bắt buộc cập nhật
    // mandatoryContinueButtonLabel: 'Cập nhật', // Bắt buộc cập nhật
    optionalIgnoreButtonLabel: 'Để sau',
    optionalInstallButtonLabel: 'Cập nhật',
    optionalUpdateMessage: 'Đã có bản cập nhật mới!'
  },
  installMode: codePush.InstallMode.IMMEDIATE
} as CodePushOptions)
export class Root extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
  // console.disableYellowBox = true;
  }
  
  render() {
    return (
      <View style={styles.container}>
        <I18nextProvider i18n={i18next}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <AppBaseComponent />
            </PersistGate>
          </Provider>
        </I18nextProvider>
      </View>
    )
  }
}

class BaseComponent extends React.Component<any, any> {
  render() {
    return (
      <View key="app-container" style={{ flex: 1 }}>
        <GlobalModal ref={ref => GlobalModalSetup.setGlobalModalHolder(ref)} />
        <App />
      </View>
    )
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
const AppBaseComponent = connect(state => (state as any).rootApp)(translate()(BaseComponent))
