import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Linking, Alert, StyleSheet } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
// import NavigationBar from '../Navigation/NavigationBar';

const LeftContent = ({ image }) => {
    return (
      <Avatar.Image size={70} style={{ marginTop: 20, backgroundColor: "red" }} source={{ uri: image }} />
    );
}

const HomeScreen = () => {

    // const addToFavorites = async (item) => {
    //     try {
    //       let oldData = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
    //       const isDuplicate = oldData.some(existingItem => existingItem && existingItem.nom === item.nom);
    //       if (!isDuplicate) {
    //         oldData.push(item);
    //         await AsyncStorage.setItem('favorites', JSON.stringify(oldData));
    //         console.log('Data added to favorites successfully.');
    //         Alert.alert('Success', 'Pharmacy added to favorites successfully.');
    //         loadFavorites()
    //       } else {
    //         console.log('This item is already in favorites.');
    //         Alert.alert('Alert', 'Pharmacy is already in favorites.');
    //       }
    //     } catch (error) {
    //       console.error('Error adding to favorites:', error);
    //     }
    //   };
    
      const handlePress = (url) => {
        Linking.openURL(url);
    };
    
      const [data, setData] = useState([]);
    //   const [favorites, setFavorites] = useState([]);
    
      const options = {
        method: 'GET',
        url: 'https://api.sportmonks.com/v3/football/leagues',
        headers: {
          'authorization': 'GLAB8uX2Q6e574s1cIvoJKuH7i3loCiRwUMrApyw7pp1xzUp47RBmJt35abe'
        }
      };
    
      const fetchFootball = async () => {
        axios.request(options)
        .then(res => {
          const footballData = res.data.data;
          setData(footballData)
        })
        .catch(error => {
          console.error('Error occurred:', error.message);
        });
      };
    
    //   const loadFavorites = async () => {
    //     try {
    //       const storedFavorites = await AsyncStorage.getItem('favorites');
    //       if (storedFavorites) {
    //         setFavorites(JSON.parse(storedFavorites));
    //       }
    //     } catch (error) {
    //       console.error('Error loading favorites:', error);
    //     }
    //   };
    
      useEffect(() => {
        fetchFootball();
        // loadFavorites();
      }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingVertical: 30,
        }}
      >
        {Array.isArray(data) && data.map((item) => (
          <TouchableOpacity key={item.id} onPress={() => handlePress(item.image_path)}>
            <Card style={{ marginBottom: 10 }}>
            {/* {favorites.some(favorite => favorite.name === item.name) && (
                <Card.Actions>
                    <Avatar.Icon
                      size={20}
                      icon="heart"
                      style={{
                        backgroundColor: 'red',
                        marginTop: 5,
                        marginEnd: 10
                      }}
                    />
                </Card.Actions>
              )} */}
              <Card.Title
                titleStyle={{ marginLeft: 40 }}
                title={item.name}
                subtitle={item.name}
                subtitleStyle={{ marginLeft: 40 }}
                titleVariant="bodyLarge"
                left={() => <LeftContent image={item.image_path} />}
              />
              <Text style={{ marginLeft: 113 }}>{item.name} </Text>
              {/* <Card.Actions>
                <Button icon="plus" mode="outlined" textColor="green" onPress={() => addToFavorites(item)}>
                  Add to favorite
                </Button>
              </Card.Actions> */}
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* <NavigationBar navigation={navigation} /> */}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
    },
  });

export default HomeScreen