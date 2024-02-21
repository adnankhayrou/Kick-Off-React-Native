import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './navigation/appNavigation';
import { Provider } from 'react-redux';
import store from './redux/store';


const App = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
    </Provider>
  );
};

export default App;



