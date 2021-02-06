import { Header, Icon } from 'native-base'
import React from 'react'
import { Dimensions, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Value } from 'react-native-reanimated'
import { ColorContentTheme, ColorTheme, percentScreen } from 'shared/system'
import { CInput } from '..'

const DEVICE_WIDTH = Dimensions.get('window').width
const DESIGN_WIDTH = 375
const DEVICE_HEIGHT = Dimensions.get('window').height
const DESIGN_HEIGHT = 667
export const ratioW = DEVICE_WIDTH / DESIGN_WIDTH
export const ratioH = DEVICE_HEIGHT / DESIGN_HEIGHT

interface Props {
  onPressBack: any
  title: string
  showBackButton: boolean
  onSearch: (value: any) => void
}

class HeaderNormal extends React.Component<Props, {}> {

  static defaultProps = {
    title: '',
    showBackButton: false,
  }

  constructor(props: Props) {
    super(props)
    StatusBar.setTranslucent(true)
    StatusBar.setBarStyle('dark-content')
    StatusBar.setBackgroundColor('transparent')
  }
  onSearch = (value: any) => {
    this.props.onSearch(value)
  }

  render() {
    const { title, showBackButton, onPressBack } = this.props
    return (
      <View style={styles.container}>
        <Header noShadow rounded transparent androidStatusBarColor={ColorTheme} iosBarStyle={'dark-content'}>
          <View style={styles.left}>
            {showBackButton &&
              <TouchableOpacity
                style={styles.boxIcon}
                onPress={() => {
                  onPressBack()
                }}
              >
                <Icon style={styles.icon} type={'MaterialIcons'} name={'arrow-back'} />
              </TouchableOpacity>
            }
          </View>
          <View style={[styles.center, showBackButton && { marginRight: 44 * percentScreen }]}>
            <CInput
              // keyboardType="phone-pad"
              placeholder={'Tìm kiếm gói du lịch'}
              onChangeText={(txt: string) => this.onSearch(txt)}
              value={''}
            />
          </View>
        </Header>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorTheme,
    justifyContent: 'center',
  },
  boxIcon: {
    width: 44 * percentScreen,
    alignItems: 'center',
  },
  icon: {
    color: ColorContentTheme,
    fontSize: 30 * percentScreen
  },
  left: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5
  },
  title: {
    fontSize: 20 * percentScreen,
    color: ColorContentTheme,
    fontWeight: 'bold'
  },
})


export default HeaderNormal
