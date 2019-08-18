import React from 'react';

import {createAppContainer, createStackNavigator} from 'react-navigation';

import Home from './screens/Home';
import Article from './screens/Article';

const AppNavigator = createStackNavigator(
  {
    Home: {screen: Home},
    Article: {screen: Article, path: '/article/:id'},
  },
  {
    initialRouteName: 'Home',
  },
);

const prefix = 'deep-linking://deep-linking';

const App = createAppContainer(AppNavigator);

const MainApp = () => <App uriPrefix={prefix} />;

export default MainApp;
