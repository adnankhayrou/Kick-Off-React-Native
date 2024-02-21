import React from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';

const Item = ({ item, removeFromFavorites, isFavorite }) => (
  <View>
      <Button title="Remove from Favorites" onPress={() => removeFromFavorites(item)} />
  </View>
);

const mapDispatchToProps = (dispatch) => ({
  removeFromFavorites: (item) => dispatch({ type: 'REMOVE_FAVORITE', payload: item })
});

export default connect(null, mapDispatchToProps)(Item);