import React from 'react';
import { YellowBox } from "react-native";
import _ from "lodash";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import {videoReducer} from './store/reducers/video';
import {userReducer} from './store/reducers/user';
import ReduxThunk from "redux-thunk";
import { init } from './helpers/db';
import NavigationContainer from './navigation/NavigationContainer'
//import RegisterScreen from './screens/RegisterScreen'
//import AddVideoScreen from './screens/AddVideoScreen';

init().then(() => {
  console.log('initialized database ')
}).catch(err => {
  console.log('initializing db failed ')
  console.log(err)
})

const rootReducer = combineReducers({
  videos: videoReducer,
  user: userReducer
})
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
export default function App() {
  YellowBox.ignoreWarnings(['Setting a timer']);
  const _console = _.clone(console);
  console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
      _console.warn(message);
    }
  };
  return (
    <Provider store={store}>
      <NavigationContainer/>
    </Provider>
  );
}
