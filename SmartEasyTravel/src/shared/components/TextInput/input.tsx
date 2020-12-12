import { Input, NativeBase } from 'native-base'
import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
export interface Props extends NativeBase.Input {
  valid?: ((e: string) => boolean | undefined) | (boolean | undefined)
  style?: {}
}
interface State {
  input: string
  showPassword: boolean
}
// tslint:disable-next-line:function-name
export default class CInput extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      input: props.value || '',
      showPassword: props.secureTextEntry || false
    }
  }
  handleChangeText(e: string) {
    this.setState({ input: e })
  }
  showPassword() {
    this.setState({ showPassword: !this.state.showPassword })
  }
  render() {
    const { valid, children, value, onChangeText, onFocus, onBlur, style, secureTextEntry, disabled, placeholder, ...restProps } = this.props
    const { input } = this.state
    const isValid = !secureTextEntry ? inputStyleValidate(valid, input) : valid ? (inputStyleValidate(valid, input) === 'true' ? 'undefined' : 'false') : 'undefined'
    return (
      <View
        style={{
          position: 'relative',
          alignSelf: 'center',
          height: 48,
          width: '100%',
          flexDirection: 'row',
          ...style
        }}
      >
        <Input
          {...restProps}
          placeholderTextColor={'#BDBDBD'}
          placeholder={placeholder}
          value={this.state.input}
          returnKeyType={'done'}
          disabled={disabled}
          autoCorrect={false}
          onChangeText={e => {
            this.handleChangeText.bind(this)(e)
            if (onChangeText) {
              onChangeText(e)
            }
          }}
          secureTextEntry={this.state.showPassword}
          style={Object.assign(
            {},
            {
              ...styles.input,
              ...(disabled ? styles.disabled : {}),
              ...validateStyle[isValid]
            }
          )}
        >
          {children}
        </Input>
        {!secureTextEntry ? (
          <Image
            style={{
              width: 15,
              height: 15,
              position: 'absolute',
              top: isValid === 'true' ? 16 : 16,
              right: 15
            }}
            source={isValid === 'undefined' ? null : isValid === 'true' ? require('assets/icons/path.png') : require('assets/icons/close.png')}
          />
        ) : (
          !disabled && (
            <TouchableOpacity
              style={{
                width: 24,
                height: 24,
                position: 'absolute',
                top: 12,
                right: 15
              }}
              onPress={this.showPassword.bind(this)}
            >
              <Image resizeMode="contain" style={{ width: 24, height: 24 }} source={this.state.showPassword ? require('assets/icons/password-hide.png') : require('assets/icons/password-show.png')} />
            </TouchableOpacity>
          )
        )}
      </View>
    )
  }
}
function inputStyleValidate(valid: ((e: string) => boolean | undefined) | (boolean | undefined), input: string): 'true' | 'false' | 'undefined' {
  let validString: 'true' | 'false' | 'undefined' = 'undefined'
  if (typeof valid === 'function') {
    const rule = valid(input)
    validString = rule !== undefined ? (rule.toString() as 'true' | 'false') : 'undefined'
  } else if (typeof valid === 'boolean') {
    validString = valid.toString() as 'true' | 'false'
  } else {
    validString = 'undefined'
  }
  return validString
}
const styles = StyleSheet.create({
  container: {},
  active: {},
  disabled: {
    backgroundColor: '#E4E6EA',
    borderColor: '#E4E6EA',
    color: '#43484B'
  },
  input: {
    backgroundColor: '#fff',
    width: '100%',
    height: 48,
    borderRadius: 9,
    paddingLeft: 14,
    paddingTop: 14,
    paddingBottom: 14,
    paddingRight: 30,
    fontSize: 15,
    borderWidth: 1,
    fontFamily: 'Cabin'
  },
  normalStyle: {
    borderColor: '#D3DCE6',
    color: '#1F2D3D'
  },
  validStyle: {
    borderColor: '#3AAA35',
    color: '#3AAA35'
  },
  errorStyle: {
    borderColor: '#E5007D',
    color: '#E5007D'
  }
})
const validateStyle: {
  [s: string]: {
    borderColor: string
    color: string
  }
} = {
  false: styles.errorStyle,
  true: styles.validStyle,
  undefined: styles.normalStyle
}
