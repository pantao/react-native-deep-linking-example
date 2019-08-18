import React from 'react'

import { StyleSheet, Text, View } from 'react-native'

import { NavigationScreenComponent } from 'react-navigation'

interface IProps {}

interface IState {}

const AboutScreen: NavigationScreenComponent<IProps, IState> = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Page</Text>
    </View>
  )
}

AboutScreen.navigationOptions = {
  title: 'About',
}

export default AboutScreen

const styles = StyleSheet.create({
  container: {},
  title: {},
})
