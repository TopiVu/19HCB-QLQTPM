import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native';
import { NavigationSwitchScreenProps } from 'react-navigation';
import { Header } from 'shared/components';

interface Props extends NavigationSwitchScreenProps<any> { }
class DetailPage extends Component<Props, {}> {
  constructor(props: Props) {
    super(props)
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
         <Header
          title="Detail"
          onPressBack={() => this.props.navigation.goBack()}
          showBackButton={true} 
        />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Details Screen</Text>
        </View>
      </View>
    )
  }
}

export default DetailPage;