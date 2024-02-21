import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';

const FavoriteScreen = ({ favorites }) => (
  <View>
    <Text>Favorite Items:</Text>
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <Text>{item.name}</Text>}
    />
  </View>
);

const mapStateToProps = (state) => ({
  favorites: state.favorites.favorites
});

export default connect(mapStateToProps)(FavoriteScreen);