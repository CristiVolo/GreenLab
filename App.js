import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import ActuatorControlScreen from './screens/ActuatorControlScreen';
import GraphScreen from './screens/GraphScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='GraphScreen'>
        <Stack.Screen 
          options={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid
          }} 
          name = "ActuatorScreen" 
          component = {ActuatorControlScreen}
        /> 
        <Stack.Screen 
          options={{
            headerShown: false, 
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid
          }} 
          name = "GraphScreen" 
          component = {GraphScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
