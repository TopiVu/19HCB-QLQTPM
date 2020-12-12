import { Header, Icon } from 'native-base'
import React from 'react'
import { Dimensions, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ColorContentTheme, ColorTheme, percentScreen } from 'shared/system'

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
                <Icon  style={styles.icon} type={'MaterialIcons'} name={'arrow-back'} />
              </TouchableOpacity>
            }
          </View>
          <View style={[styles.center, showBackButton && { marginRight: 44 * percentScreen }]}>
            {title.length > 0 &&
              <Text style={styles.title}>{(title)}</Text>
            }
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
