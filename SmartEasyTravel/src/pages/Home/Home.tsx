import { Login } from 'core/actions';
import React, { Component } from 'react';
import { translate, WithNamespaces } from 'react-i18next';
import { FlatList, Platform, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { UIActivityIndicator } from 'react-native-indicators';
import { NavigationSwitchScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import { PlainAction } from 'redux-typed-actions';
import { CImage, Header } from 'shared/components';
import { ColorContentTheme, ColorTheme, ColorThemeOrgan, percentScreen } from 'shared/system';
import { translate as t } from 'shared/translate/translate';

const DATA = [
  { code: 'DOC/100/001', date: '10/20/2020', status: 'DAFT' },
  { code: 'DOC/100/002', date: '10/20/2020', status: 'DAFT' },
  { code: 'DOC/100/003', date: '10/20/2020', status: 'OPEN' },
  { code: 'DOC/100/004', date: '10/19/2020', status: 'DONE' },
  { code: 'DOC/100/005', date: '10/17/2020', status: 'DONE' },
  { code: 'DOC/100/006', date: '10/13/2020', status: 'DONE' },
  { code: 'DOC/100/007', date: '10/10/2020', status: 'DONE' },
  { code: 'DOC/100/008', date: '10/10/2020', status: 'DONE' },
]
const mapStateToProps = (state: any) => state['rootApp'] || {}

const mapDispatchToProps = (dispatch: (action: PlainAction) => void) => {
  return {
  }
}
interface Props extends NavigationSwitchScreenProps<any>, WithNamespaces {
}
interface State {
  
}
class HomePageComponent extends Component<Props, State>  {
  constructor(props: Props) {
    super(props)
  
  }
  
  renderItem = () =>  {
    return (
      <View>
        <View style={styles.cartItem}>
          <View style={{ margin: 16 }}>
            <View>
              <Text>Du lịch mùa hè tại Phú Quốc ( 3 ngày 2 đêm) </Text>
            </View>
            <View style={styles.line} />
            <View style={{ flexDirection: 'row' }}>
              <CImage 
              source={require('assets/pictures/img_tour.png')}
              resizeMode={'contain'}
              style={{ height: 90, width: 120 }}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.txtDesciption}  numberOfLines={3}>Tour du lịch hè thú vị cùng công ty Winway tại phú quốc. Trải nghiệm hằng trăm món ăn đọc đáo và thú vị. Tận hưởng những ưu đãi đúng c...</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text>Số khách</Text>

                </View>
              </View>

            </View>
          </View>
          
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          title={t('home:title')}
          onPressBack={() => { }}
        />
        <View style={{ backgroundColor: '#E5E5E5', flex: 1 }}>
          {this.renderItem()}
        </View>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cartItem : {
    height: 200 * percentScreen,
    backgroundColor: '#FFFFFF',
    margin: 16
  },
  line: {
    marginVertical: 5,
    height: 1,
    backgroundColor: '#E5E5E5'
  },
  txtDesciption: { 
    color: '#888888',
    fontSize: 13
  }
  
})
export default connect(mapStateToProps, mapDispatchToProps)(translate()(HomePageComponent))