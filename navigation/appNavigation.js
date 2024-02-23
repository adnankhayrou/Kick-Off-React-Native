import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen';
import PlayersScreen from '../screens/PlayersScreen';
import PlayerDetails from '../screens/PlayerDetails';
import MatchDetails from '../screens/MatchDetails';
import FavoriteScreen from '../screens/FavoriteScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MainTabs" component={MainTabs} options={{
            headerTitle: 'KickOff',
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: 'bold',
            },
            headerLeft: () => null,
             headerRight: () => (
              <IconWithCount iconName="save" count={3} />
            ),}} />
      <Stack.Screen name="PlayerDetails" component={PlayerDetails} />
      <Stack.Screen name="MatchDetails" component={MatchDetails} />
    </Stack.Navigator>
  );
};

const MainTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Matches" component={HomeScreen} options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="football" size={size} color={color} />
        ),
      }} />
      <Tab.Screen name="Players" component={PlayersScreen} options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="people" size={size} color={color} />
        ),
      }} />
      <Tab.Screen name="Favorites" component={FavoriteScreen} options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="save" size={size} color={color} />
        ),
      }} />
    </Tab.Navigator>
  );
};

export default AppNavigation;
