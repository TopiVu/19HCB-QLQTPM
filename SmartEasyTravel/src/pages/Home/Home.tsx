import { Login } from 'core/actions';
import { store } from 'core/root';
import React, { Component } from 'react';
import { translate, WithNamespaces } from 'react-i18next';
import { FlatList, Platform, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { UIActivityIndicator } from 'react-native-indicators';
import { NavigationSwitchScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import { PlainAction } from 'redux-typed-actions';
import { CImage, Header, HeaderSearch } from 'shared/components';
import { ColorContentTheme, ColorTheme, ColorThemeOrgan, percentScreen } from 'shared/system';
import { translate as t } from 'shared/translate/translate';
import { GetTour } from './redux/actions';
import { dataToursFake } from './constant'
const mapStateToProps = (state: any) => state['homeStore'] || {}

const mapDispatchToProps = (dispatch: (action: PlainAction) => void) => {
  return {
  }
}
interface Props extends NavigationSwitchScreenProps<any>, WithNamespaces {
  refreshing: boolean
  onLoadMore: boolean
  dataTours: any
}
interface State {

}
class HomePageComponent extends Component<Props, State>  {
  constructor(props: Props) {
    super(props)

  }
  renderItem = ({item, index}: any) => {
    return (
      <View>
        <TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate('DetailsPage')} style={styles.cartItem}>
          <View style={{ margin: 16 }}>
            <View>
              <Text>{item.name} </Text>
              <View style={styles.iconStar}>
                <Text style={styles.label}>{item.rate}</Text>
                <CImage
                  source={require('assets/icons/icon_star.png')}
                  resizeMode={'contain'}
                  style={{ height: 13, width: 13 }}
                />
              </View>
            </View>
            <View style={styles.line} />
            <View style={{ flexDirection: 'row' }}>
              <CImage
                source={require('assets/pictures/img_tour.png')}
                resizeMode={'contain'}
                style={{ height: 90, width: 120, marginTop: 10 }}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.txtDesciption} numberOfLines={2}>{item.content}</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.label}>Số khách :</Text>
                  <Text style={styles.txtContent}>{item.member} người</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.label}>Thời gian :</Text>
                  <Text style={styles.txtContent}>{item.time}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.label}>Hạn chót :</Text>
                  <Text style={styles.txtContent}>{item.deadline}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.label}>Phân khúc :</Text>
                  <Text style={[styles.txtContent, { color: 'red' }]}>{item.price} triệu</Text>
                </View>
              </View>

            </View>
          </View>

        </TouchableOpacity>
      </View>
    )
  }
  onSearch = (txt: any) => {
    console.log('log_search', txt)
    const value = {
      search: txt
    }
    store.dispatch(GetTour.get(value))
  }
  onRefresh = () => {
    const value = {
      search: ''
    }
    store.dispatch(GetTour.get(value))
  }
  onLoadMore = () => {
    //
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <HeaderSearch
          title={t('home:title')}
          onPressBack={() => { }}
          onSearch={(txt: any) => this.onSearch(txt)}
        />
        <View style={{ backgroundColor: '#E5E5E5', flex: 1 }}>
          <FlatList data={dataToursFake || []}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={this.props.refreshing}
                onRefresh={this.onRefresh}
              />
            }
            // onEndReached={this.onLoadMore}
            // onEndReachedThreshold={Platform.OS === 'ios' ? 0 : 0.2}
          />

        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  cartItem: {
    height: 170 * percentScreen,
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 9,
    elevation: 1
  },
  line: {
    marginVertical: 5,
    height: 1,
    backgroundColor: '#E5E5E5'
  },
  txtDesciption: {
    color: '#888888',
    fontSize: 13
  },
  label: {
    fontSize: 13
  },
  txtContent: {
    fontSize: 13,
    color: '#888888',
  },
  iconStar: {
    position: 'absolute',
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    top: -12
  }

})
export default connect(mapStateToProps, mapDispatchToProps)(translate()(HomePageComponent))