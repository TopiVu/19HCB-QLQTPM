import { Login } from 'core/actions';
import React, { Component } from 'react';
import { translate, WithNamespaces } from 'react-i18next';
import { FlatList, Platform, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { UIActivityIndicator } from 'react-native-indicators';
import { NavigationSwitchScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import { PlainAction } from 'redux-typed-actions';
import { Header } from 'shared/components';
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
 
  render() {

    return (
      <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
        <Text> This is Home</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  
})
export default connect(mapStateToProps, mapDispatchToProps)(translate()(HomePageComponent))