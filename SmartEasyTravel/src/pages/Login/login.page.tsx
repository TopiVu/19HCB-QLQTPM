import AsyncStorage from '@react-native-community/async-storage';
import { Login, SetAppConfig } from 'core/actions';
import { store } from 'core/root';
import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { CInput } from 'shared/components';
import { ColorContentTheme, ColorTheme, DEVICE_WIDTH, percentScreen } from 'shared/system';
import { translate } from 'shared/translate/translate';
import { LoginRequest } from './redux/actions';

interface Props { }
interface State {
  userName: string
  password: string
  emptyUserName: boolean
  emptyPassword: boolean
}

class MorePage extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      userName: '',
      password: '',
      emptyUserName: false,
      emptyPassword: false,
    }
  }
  componentDidMount() {
    const language = store.getState().rootApp.config.language
    this.setState({})
    // changeLanguage(language)
  }
  onLogin = () => {
    const { userName, password, emptyUserName, emptyPassword } = this.state
    this.setState({ emptyUserName: false, emptyPassword: false })
    if (userName === '' || password === '') {
      if (userName === '') {
        this.setState({ emptyUserName: true })
      }
      if (password === '') {
        this.setState({ emptyPassword: true })
      }
      return true
    }
    const value = {
      username: "user001",
      password: "123456"
    }
    store.dispatch(LoginRequest.get(value))
  }
  isDisabled = () => {
    const { userName, password, emptyUserName, emptyPassword } = this.state
    if (userName === '' || password === '') {
      if (userName === '') {
        this.setState({ emptyUserName: true })
      }
      if (password === '') {
        this.setState({ emptyPassword: true })
      }
      return true
    }
    return false
  }
  render() {
    const { userName, password, emptyUserName, emptyPassword } = this.state
    return (
      <View style={styles.contaniner}>
        <View>
          <Text style={styles.title}>{translate('login:title')}</Text>
        </View>
        <View style={styles.viewBoxValue}>
          <Text style={styles.txtLabel}>{translate('login:userName')}</Text>
          <CInput
            // keyboardType="phone-pad"
            placeholder={translate('login:userName')}
            onChangeText={(txt: string) => this.setState({ userName: txt })}
            value={userName}
          />
          {emptyUserName && <Text style={styles.errorTxt}>{translate('common:notBlank')}</Text>}
          <Text style={styles.txtLabel}>{translate('login:password')}</Text>
          <CInput
            secureTextEntry={true}
            textContentType="password"
            placeholder={'******'}
            onChangeText={(txt: string) => this.setState({ password: txt })}
            value={password}
          />
          {emptyPassword && <Text style={styles.errorTxt}>{translate('common:notBlank')}</Text>}
        </View>
        <View>

          <TouchableOpacity activeOpacity={0.8} style={styles.btnLogin} onPress={this.onLogin}>
            <Text style={styles.txtBtn}>{translate('login:login')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  contaniner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30 * percentScreen,
    color: ColorTheme,
    marginTop: -100 * percentScreen
  },
  viewBoxValue: {
    margin: 16
  },
  txtLabel: {
    fontSize: 16 * percentScreen,
    marginTop: 6 * percentScreen,
    marginBottom: 4 * percentScreen
  },
  btnLogin: {
    backgroundColor: ColorTheme,
    width: DEVICE_WIDTH - 32,
    height: 48 * percentScreen,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9
  },
  txtBtn: {
    fontWeight: 'bold',
    color: ColorContentTheme,
    fontSize: 18 * percentScreen
  },
  errorTxt: {
    color: 'red',
    fontSize: 14 * percentScreen
  }
})
export default MorePage;