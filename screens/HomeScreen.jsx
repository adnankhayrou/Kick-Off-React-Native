import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'; 
import { View, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const LeftContent = () => {
    return (
      <Avatar.Image size={70} style={{ marginTop: 50, backgroundColor: "gray" }} source={require('../assets/images/player1.png')} />
    );
}

const handleMatchPress = (id) => {
  // navigation.navigate('TeamScreen', { id });
  console.log("presss", id )
};

const HomeScreen = ({ addToFavorites, removeFromFavorites, isFavorite, navigation }) => {
    
      const [data, setData] = useState([]);
    
      const options = {
        method: 'GET',
        url: 'https://api.sportmonks.com/v3/football/fixtures?include=participants',
        headers: {
          'authorization': 'GLAB8uX2Q6e574s1cIvoJKuH7i3loCiRwUMrApyw7pp1xzUp47RBmJt35abe'
        }
      };

       function navigateTo() {
          navigation.navigate('Item'); 
      }
      
      
    
      const fetchFootball = async () => {
        axios.request(options)
        .then(res => {
          const footballData = res.data.data;
          console.log(footballData);
          setData(footballData)
        })
        .catch(error => {
          console.error('Error occurred:', error.message);
        });
      };
    
      useEffect(() => {
        fetchFootball();
       
      }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingVertical: 30,
        }}
      >
        {/* {Array.isArray(data) && data.map((item) => (
          <TouchableOpacity key={item.id} onPress={() => navigateTo()}>

            <Card key={item.id} style={{ marginBottom: 10 }}>

            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                {isFavorite ? (
                  <Ionicons onPress={() => removeFromFavorites(item)} name={'save'} size={25} color="red" style={{ marginRight: 8, marginTop: 5 }} />

                  // <Button
                  //   style={{ backgroundColor: 'red' }}
                  //   title="Remove from Favorites"
                  //   onPress={() => removeFromFavorites(item)}
                  //   icon={() => <Ionicons name="heart" size={24} color="white" />} 
                  // />
                ) : (
                  <Ionicons onPress={() => addToFavorites(item)} name={'save'} size={25} color="black" style={{ marginRight: 8, marginTop: 5 }} />
                  // <Button 
                  //   style={{backgroundColor:'black'}}
                  //   title="Add to Favorites"
                  //   onPress={() => addToFavorites(item)}
                  //   icon={() => <Ionicons name="heart" size={24} color="white" />}
                  // />
                )}
              </View>
           
              <Card.Title
                titleStyle={{ marginLeft: 40 }}
                title={item.name}
                subtitle={item.type}
                subtitleStyle={{ marginLeft: 40 }}
                titleVariant="bodyLarge"
                left={LeftContent}
                />
              <Text style={{ marginLeft: 113, marginBottom:10 }}>{item.starting_at} </Text>
              <Text style={{ marginLeft: 113 }}>{item.starting} </Text>
              </Card> 
              </TouchableOpacity>

        ))} */}
        {Array.isArray(data) && data.map((item) => (
              <View key={item.id} style={{}}>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginTop: 10,
                  }}
                >
                  
                  {item.participants.map((team, index) => (
                    <React.Fragment key={team.id}>
                      
                      {index !== 0 && <Text >vs</Text>}
                      

                      <View key={team.id} style={{ alignItems: 'center' }}>
                        <Image
                          source={{ uri: team.image_path }}
                          style={{ width: 50, height: 50 }}
                        />
                        <Text style={{}} >{team.name.substring(0, 3)}</Text>
                      </View>
                    </React.Fragment>
                  ))}
                </View>
                <Button onPress={handleMatchPress(item.id)} >
                  <Text>
                  see details

                  </Text>

                  </Button>

              </View>

            ))}
      </ScrollView>
      
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

const mapDispatchToProps = (dispatch) => ({
  addToFavorites: (item) => dispatch({ type: 'ADD_FAVORITE', payload: item }),
  removeFromFavorites: (item) => dispatch({ type: 'REMOVE_FAVORITE', payload: item })
});
export default connect(null, mapDispatchToProps)(HomeScreen); 