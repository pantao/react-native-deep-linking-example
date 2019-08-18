import React from 'react';

import {View, Text, StyleSheet} from 'react-native';

import {NavigationScreenComponent} from 'react-navigation';

interface IProps {}

interface IState {}

const HomeScreen: NavigationScreenComponent<IProps, IState> = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Page</Text>
    </View>
  );
};

HomeScreen.navigationOptions = {
  title: 'Home',
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {},
  title: {},
});
