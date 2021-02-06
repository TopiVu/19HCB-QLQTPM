import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FisrtScreen from 'pages/firstScreen';
import DetailHomeScreen from 'pages/Home/Detail';
import HomePage from 'pages/Home/Home';
import LoginPage from 'pages/Login/login.page';
import MorePage from 'pages/More/More';
import * as React from 'react';
import { Image, Text } from 'react-native';
import { ColorTheme, ColorThemeOrgan, percentScreen } from 'shared/system';
import { translate } from 'shared/translate/translate';
import { store } from './root';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeFlow() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }} />
      <Stack.Screen name="DetailsPage"  component={DetailHomeScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
function MoreFlow() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MorePage" component={MorePage} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
function AuthFlow() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FisrtSceen" component={FisrtScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

function App() {
  console.log('log__', store.getState())
  return (
    <NavigationContainer>
      {(store.getState() as any).rootApp && (store.getState() as any).rootApp?.access_token ?
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = require('assets/icons/tab-home.png')
              if (route.name === 'Home') {
                iconName = require('assets/icons/tab-home.png')
              } else if (route.name === 'More') {
                iconName = require('assets/icons/tab-more.png')
              } else {
                iconName = require('assets/icons/tab-home.png')
              }

              // You can return any component that you like here!
              return <Image source={iconName} style={{ height: 30 * percentScreen, width: 30 * percentScreen, tintColor: color, resizeMode: 'contain' }} />
            },
            tabBarLabel: ({ focused, color, position }) => {
              let titleName = translate('home:title')
              if (route.name === 'Home') {
                titleName = translate('home:title')
              } else if (route.name === 'More') {
                titleName = translate('more:title')
              } else {
                titleName = translate('more:title')
              }
              return <Text style={{ fontWeight: '500', color: color, fontSize: 14 * percentScreen }}>{titleName}</Text>
            }
          })}
          tabBarOptions={{
            activeTintColor: ColorTheme,
            inactiveTintColor: ColorThemeOrgan,
          }}

        >

          <Tab.Screen name="Home" component={HomeFlow} />
          <Tab.Screen name="More" component={MoreFlow} />
        </Tab.Navigator> :
        <Stack.Navigator>
          <Stack.Screen name="Auth" component={AuthFlow} options={{ headerShown: false }} />
        </Stack.Navigator>}
    </NavigationContainer>
  );
}

export default App;