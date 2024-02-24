import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './navigation/appNavigation';
import {DataProvider} from './context/DataProvider'


const App = () => {
  return (
    <NavigationContainer>
      <DataProvider>
         <AppNavigation />
      </DataProvider>
    </NavigationContainer>
  );
};

export default App;



