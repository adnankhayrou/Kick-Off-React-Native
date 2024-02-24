import React, { useState } from "react";
import { Alert, AsyncStorage } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const DataContext = React.createContext();

function DataProvider({ children }) {

  const [favorites, setFavorites] = useState([]);

  const addToFavorite = async (item) => {
    console.log('in the add function',item);
    try {
      let oldData = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
      const isDuplicate = oldData.some(existingItem => existingItem && existingItem.nom === item.nom);
      if (!isDuplicate) {
        oldData.push(item);
        await AsyncStorage.setItem('favorites', JSON.stringify(oldData));
        console.log('Data added to favorites successfully.');
        Alert.alert('Success', 'Pharmacy added to favorites successfully.');
      } else {
        console.log('This item is already in favorites.');
        Alert.alert('Alert', 'Pharmacy is already in favorites.');
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
    loadFavorites();
  };

  const removeItem = async (itemToRemove) => {
    try {
        let oldData = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
        const newData = oldData.filter(existingItem => existingItem.codeCog !== itemToRemove.codeCog);
        await AsyncStorage.setItem('favorites', JSON.stringify(newData));
        console.log('Item removed from favorites successfully.');
    } catch (error) {
        console.error('Error removing from favorites:', error);
    }
    loadFavorites();
  };


  const loadFavorites = async () => {
    try {
        // const storedFavorites = await AsyncStorage.getItem('favorites');
        // if (storedFavorites) {
        //   setFavorites(JSON.parse(storedFavorites));
        // }
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
  };

  return (
    <DataContext.Provider value={{
      addToFavorite,
      removeItem,
      loadFavorites,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export { DataProvider, DataContext} ;
