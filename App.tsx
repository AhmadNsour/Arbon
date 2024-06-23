// App.js
import React from 'react';
import {Provider} from 'react-redux';
import AppNavigator from './src/navigation/AppNavigator';
import store from './src/redux/store';
import {ThemeProvider} from './src/theme/ThemeProvider';

const App = () => {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </ThemeProvider>
  );
};

export default App;
