import AsyncStorage from '@react-native-community/async-storage'
import { SetAppConfig } from 'core/actions'
import { store } from 'core/root'
import React, { Component } from 'react'
import { translate, WithNamespaces } from 'react-i18next'
import { View } from 'react-native'
import { UIActivityIndicator } from 'react-native-indicators'
import { NavigationSwitchScreenProps } from 'react-navigation'
import { changeLanguage } from 'shared/translate/translate'

interface Props extends NavigationSwitchScreenProps<any>, WithNamespaces {}
interface State {}
class FirtScreenComponent extends Component<Props, State> {
    constructor(props: Props){
      super(props)
    }
    componentDidMount() {
      AsyncStorage.getItem('config').then((data: any) => {
        if (data) {
          changeLanguage(JSON.parse(data).language)
        }
      })
      AsyncStorage.getItem('access_token').then(data => {
        if (data) {
          return store.dispatch(SetAppConfig.get({ token: data }))
        }
        return this.props.navigation.navigate('Login')
      })
    }
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'  }}>
            <UIActivityIndicator color="#008BD2" size={50} /> 
        </View>
      )
    }
}
export default translate()(FirtScreenComponent)