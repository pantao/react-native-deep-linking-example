import React from 'react'

import { createAppContainer, createStackNavigator } from 'react-navigation'

import About from './screens/About'
import Article from './screens/Article'
import Home from './screens/Home'

const AppNavigator = createStackNavigator(
  {
    Home: { screen: Home },
    About: { screen: About, path: 'about' },
    Article: { screen: Article, path: 'article/:id' },
  },
  {
    initialRouteName: 'Home',
  },
)

const prefix = 'deep-linking://'

const App = createAppContainer(AppNavigator)

const MainApp = () => <App uriPrefix={prefix} />

export default MainApp
