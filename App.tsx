/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import AppNavigator from './src/navigation/AppNavigator';
import { store } from './src/redux/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

export default App;
