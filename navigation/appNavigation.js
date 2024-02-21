import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen';
import { Ionicons } from '@expo/vector-icons';
import Item from '../screens/Item';
import MatchDetails from '../screens/MatchDetails';

const Stack = createStackNavigator(); 

const IconWithCount = ({ iconName, count }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Ionicons name={iconName} size={30} color="black" style={{ marginRight: 8 }} />
    {count > 0 && (
      <View style={{ position: 'absolute', top: -5, right: 4, backgroundColor: 'red', borderRadius: 10, paddingVertical: 2, paddingHorizontal: 6 }}>
        <Text style={{ color: 'white', fontSize: 10 }}>{count}</Text>
      </View>
    )}
  </View>
);

const AppNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="MatchDetails" component={MatchDetails} />
      <Stack.Screen name="Item" component={Item} />
      <Stack.Screen name="Home" component={HomeScreen} options={{
            headerTitle: 'KickOff',
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: 'bold',
            },
            headerLeft: () => null,
             headerRight: () => (
              <IconWithCount iconName="save" count={3} />
            ),}}/>
    </Stack.Navigator>
  );
};

export default AppNavigation;
