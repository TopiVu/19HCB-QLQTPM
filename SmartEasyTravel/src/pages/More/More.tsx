import { ChangeLanguage, SignOut } from 'core/actions';
import { store } from 'core/root';
import { Icon } from 'native-base';
import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { CImage, GlobalModalSetup, Header } from 'shared/components';
import { ColorContentTheme, ColorTheme, DEVICE_WIDTH, percentScreen } from 'shared/system';
import { changeLanguage, translate as t } from 'shared/translate/translate';
import { translate, WithNamespaces } from 'react-i18next';
import { PlainAction } from 'redux-typed-actions';
import { connect } from 'react-redux';

import Odoo from 'react-native-odoo'

const odoo = new Odoo({
  host: '45.77.244.149',
  port: 8069,
  database: 'DLI',
  username: 'admin',
  password: 'admin'
});
//Connect to Odoo
odoo.connect(function (err) {
  if (err) { return console.log(err); 
  }
});

const mapStateToProps = (state: any) => state['rootApp'] || {}

const mapDispatchToProps = (dispatch: (action: PlainAction) => void) => {
  return {
    onChangeLanguage: (val: any) => dispatch(ChangeLanguage.get(val))
  }
}

interface Props extends WithNamespaces, PlainAction {
  onChangeLanguage: (val: any) => void
}
interface State { }
class MorePage extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }
  
  logOut() {
    Alert.alert(
      t('common:confirm'),
      t('common:questionLogout'),
      [
        {
          text: t('common:no')
        },
        {
          text: t('common:yes'),
          onPress: () => {
            store.dispatch(SignOut.get())
          }
        }
      ],
      { cancelable: false }
    )
  }
  changeLanguages = () => {
    const language = store.getState().rootApp.config.language
    if (language === 'vi') {
      changeLanguage('en')
      this.props.onChangeLanguage('en')
    } else {
      changeLanguage('vi')
      this.props.onChangeLanguage('vi')
    }
  }
  onNotUpdate = () => {
    return GlobalModalSetup.getGlobalModalHolder().alertMessage(t('common:notification'), t('common:notUpdate'))
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          title={t('more:title')}
          onPressBack={() => { }}
        />
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 16 }}>
            <CImage source={require('assets/pictures/logo.png')} style={styles.viewAvatar} resizeMode={'cover'} />
            <Text style={styles.txtName}>Lê Tuấn Vũ</Text>
          </View>
          <View style={{ marginHorizontal: 16 }}>
            <TouchableOpacity style={styles.boxAction} activeOpacity={0.6} onPress={this.onNotUpdate}>
              <Icon name='tasks' type='FontAwesome5' style={styles.iconAction} />
              <Text style={styles.txtAction}>{t('more:mission')}</Text>
            </TouchableOpacity>
            <View style={styles.line} />

            <TouchableOpacity style={styles.boxAction} activeOpacity={0.6} onPress={this.onNotUpdate}>
              <Icon name='money-bill' type='FontAwesome5' style={styles.iconAction} />
              <Text style={styles.txtAction}>{t('more:income')}</Text>
            </TouchableOpacity>
            <View style={styles.line} />

            <TouchableOpacity style={styles.boxAction} activeOpacity={0.6} onPress={this.onNotUpdate}>
              <Icon name='history' type='FontAwesome5' style={styles.iconAction} />
              <Text style={styles.txtAction}>{t('more:wacthHistory')}</Text>
            </TouchableOpacity>
            <View style={styles.line} />

            <TouchableOpacity style={styles.boxAction} activeOpacity={0.6} onPress={this.changeLanguages}>
              <Icon name='language' type='FontAwesome' style={styles.iconAction} />
              <Text style={styles.txtAction}>{t('more:changeLanguage')}: Vietnamese </Text>
              <Icon name='swap' type='Entypo' style={styles.iconAction} />
              <Text style={[styles.txtAction, { marginLeft: 0 }]}> English</Text>
            </TouchableOpacity>
            <View style={styles.line} />
          </View>
          <TouchableOpacity style={styles.btnLogout} onPress={this.logOut}>
            <Text style={styles.txtBtnLogout}>{t('more:logout')}</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  viewAvatar: {
    height: 120 * percentScreen,
    width: 120 * percentScreen,
    backgroundColor: '#888888',
    borderRadius: 60 * percentScreen
  },
  txtName: {
    fontSize: 16 * percentScreen,
    marginVertical: 4 * percentScreen
  },
  boxAction: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  txtAction: {
    fontSize: 16 * percentScreen,
    marginVertical: 16,
    marginLeft: 7
  },
  iconAction: {
    fontSize: 16 * percentScreen
  },
  line: {
    height: 0.5,
    width: DEVICE_WIDTH - 32,
    backgroundColor: '#888888'
  },
  btnLogout: {
    backgroundColor: ColorTheme,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
    height: 48 * percentScreen,
    borderRadius: 9,
    marginTop: 16
  },
  txtBtnLogout: {
    color: ColorContentTheme,
    fontSize: 16 * percentScreen
  }
})

// export default translate()(MorePage);
export default connect(mapStateToProps, mapDispatchToProps)(translate()(MorePage))