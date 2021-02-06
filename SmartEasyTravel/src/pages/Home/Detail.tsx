import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationSwitchScreenProps } from 'react-navigation';
import { CImage, Header } from 'shared/components';
import { ColorTheme, DEVICE_WIDTH, percentScreen } from 'shared/system';

interface Props extends NavigationSwitchScreenProps<any> { }
class DetailPage extends Component<Props, {}> {
  constructor(props: Props) {
    super(props)
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          title="Chi tiết gói du lịch"
          onPressBack={() => this.props.navigation.goBack()}
          showBackButton={true}
        />
        <View style={{ flex: 1 }}>
          <View>
            <CImage
              source={require('assets/pictures/img_tour.png')}
              resizeMode={'cover'}
              style={{ height: 200, width: DEVICE_WIDTH, }}
            />
          </View>

          <View>
            <Text style={styles.txtName}>Du lịch đảo Phú Quốc </Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.label}>Số khách :</Text>
              <Text style={styles.txtContent}>5-10 người</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.label}>Thời gian :</Text>
              <Text style={styles.txtContent}>18/04/2020 - 20/04/2020</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.label}>Hạn chót :</Text>
              <Text style={styles.txtContent}>11/04/2020</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.label}>Phân khúc :</Text>
              <Text style={[styles.txtContent, { color: 'red' }]}>5-7 triệu</Text>
            </View>
            <Text style={styles.txtDesciption} numberOfLines={2}>Tour du lịch hè thú vị cùng công ty Winway tại phú quốc. Trải nghiệm hằng trăm món ăn đọc đáo và thú vị. Tận hưởng những ưu đãi đúng c...</Text>
          </View>

          <View>
            <TouchableOpacity style={styles.btnContact}>
              <Text style={styles.btnContent}>LIÊN HỆ CÔNG TY</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
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
  },
  txtName: {
    fontSize: 15
  },
  btnContact: {
    backgroundColor: ColorTheme,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9,
    margin: 16
  },
  btnContent: {
    color: '#FFFFFF',
    fontSize: 15
  }

})
export default DetailPage;