import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import {DataContext} from '../context/DataProvider';


const FavoriteScreen = () => {
  const { removeItem } = useContext(DataContext);
  
  return(
      <View>
        <Text>Favorite Items:</Text>
      </View>
  )};

export default FavoriteScreen;