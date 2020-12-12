import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  Text,
  View,
  Dimensions
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import PropTypes from 'prop-types';
import { convertMoney,formatCurrency, reConvertMoney, convertNumber } from 'shared/utility'

export const DEVICE_WIDTH = Dimensions.get('window').width
const DESIGN_WIDTH = 375
const DEVICE_HEIGHT = Dimensions.get('window').height
const DESIGN_HEIGHT = 667
export const ratioW = DEVICE_WIDTH / DESIGN_WIDTH
export const ratioH = DEVICE_HEIGHT / DESIGN_HEIGHT

class TextInputScreen extends Component {
  static propTypes = {
    textSize: PropTypes.number,
    placeholder: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    value: PropTypes.string,
    keyboardType: PropTypes.string,
    placeholderTextColor: PropTypes.string,
    textColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    multiline: PropTypes.bool,
    type: PropTypes.string,
    editable: PropTypes.bool,
    onPress: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,

  }
  static defaultProps = {
    containerStyle: {},
    style: {},
    showIcon: false,
    value: '',
    placeholder: '',
    textSize: 14 * ratioW,
    secureTextEntry: false,
    keyboardType: 'default',
    placeholderTextColor: 'gray',
    textColor: 'black',
    backgroundColor: 'white',
    textError: '',
    multiline: false,
    autoFocus: false,
    rightIcon: null,
    type: 'default',
    editable: true,
    onPress: () => { },
    onFocus: () => { },
    onBlur: () => { },
  }

  constructor(props) {
    super(props);
    this.state = {
      secureTextEntryState: this.props.secureTextEntry,
      textValue: this.props.value || '',
      autoFocus: this.props.autoFocus
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.textValue !== nextProps.value) {
      this.setState({ textValue: nextProps.value || '' })
    }
  }

  focus = () => {
    if (this.props.editable) {
      return this.textInput.focus();
    }

    this.props.onPress(this.state.textValue);
  }

  onChangeText = (text) => {
    if (this.props.type === 'default') {
      this.setState({ textValue: text });
      this.props.onChangeText(text);
    }
    else {
      this.setState({ textValue: text });
      this.props.onChangeText(text);
    }
  }

  dismissKeyboard = () => {
    Keyboard.dismiss();
  }

  onPressText = () => {
    this.textInput.clear();
    this.props.onChangeText('');
    this.setState({ textValue: '' });
  }

  onPressPassword = () => {
    this.setState({ secureTextEntryState: !this.state.secureTextEntryState });
  }

  render() {
    return (
      <View style={this.props.containerStyle} >
        <TouchableWithoutFeedback
          onPress={this.focus}
        >
          <View style={[styles.container, this.props.style, { backgroundColor: this.props.editable ? this.props.backgroundColor : '#F5F5F5' }, this.props.textError.length > 0 && { marginBottom: 10 }]}
          >
            {this.props.type === 'money' && this.state.textValue.length > 0 && <Text style={styles.price}></Text>}
            {!this.props.editable ?
              <Text style={[styles.textInput, this.state.textValue.length === 0 && { color: 'gray' }]}>{this.props.type === 'default' ? (this.state.textValue.length > 0 ? this.state.textValue : this.props.placeholder) : formatCurrency(this.state.textValue)}</Text> :
              <TextInput
                style={[styles.textInput, { color: this.props.textColor, fontSize: this.props.textSize }]}
                keyboardType={this.props.keyboardType}
                onChangeText={this.onChangeText}
                underlineColorAndroid={'transparent'}
                autoCapitalize={'none'}
                returnKeyType={'done'}
                placeholder={this.props.placeholder}
                placeholderTextColor={this.props.placeholderTextColor}
                value={this.props.type === 'money' ? this.state.textValue.toString() : this.props.type === 'number' ? convertNumber(this.state.textValue) : this.state.textValue}
                secureTextEntry={this.state.secureTextEntryState}
                ref={input => { this.textInput = input }}
                multiline={this.props.multiline}
                onSubmitEditing={this.dismissKeyboard}
                autoFocus={this.state.autoFocus}
                autoCorrect={false}
                editable={this.props.editable}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
              />
            }
            {this.props.showIcon && this.props.secureTextEntry === false && this.props.rightIcon === null && (this.state.textValue.length > 0 && <TouchableWithoutFeedback onPress={() => this.onChangeText('')} style={styles.icon}><Entypo color={this.props.backgroundColor === 'white' ? 'gray' : 'gray'} name='ios-close' size={25} /></TouchableWithoutFeedback>)}
            {this.props.showIcon && this.props.secureTextEntry === true && this.props.rightIcon === null && (<TouchableWithoutFeedback onPress={this.onPressPassword} style={styles.icon}><Image source={this.state.secureTextEntryState === true ? require('assets/images/icons/password-hide.png') : require('assets/images/icons/password-show.png')} style={styles.icon} /></TouchableWithoutFeedback>)}
            {this.props.showIcon && this.props.rightIcon !== null && <Image source={this.props.rightIcon} style={styles.rightIcon} />}
          </View>
        </TouchableWithoutFeedback>
        {
          this.props.textError.length > 0 &&
          <Text style={styles.error}>{this.props.textError}</Text>
        }
      </View>);
  }
}

export default (TextInputScreen);

const styles = StyleSheet.create({
  container: {
    height: 40,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 3,
    alignItems: 'center',
    paddingHorizontal: 11
  },
  textInput: {
    flex: 1,
    backgroundColor: 'transparent',
    borderRadius: 3,
    fontSize: 14 * ratioW,
    fontFamily: 'Cabin-Regular',
    color: 'black'
  },
  icon: {
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightIcon: {
    width: 16,
    height: 12
  },
  error: {
    color: 'red',
    fontSize: 13
  },
  row: {
    maxHeight: 60
  },
  price: {
    fontSize: 14,
  }
});
