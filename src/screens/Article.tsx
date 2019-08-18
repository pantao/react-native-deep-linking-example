import React from 'react';

import {View, Text, StyleSheet} from 'react-native';

import {NavigationScreenComponent} from 'react-navigation';

interface NavigationParams {
  id: string;
}

const ArticleScreen: NavigationScreenComponent<NavigationParams> = ({
  navigation,
}) => {
  const {params} = navigation.state;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Article {params.id}</Text>
    </View>
  );
};

ArticleScreen.navigationOptions = {
  title: 'Article',
};

export default ArticleScreen;

const styles = StyleSheet.create({
  container: {},
  title: {},
});
