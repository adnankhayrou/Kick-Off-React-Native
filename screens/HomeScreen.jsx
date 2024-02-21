import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'; 
import { View, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ActivityIndicator, Avatar, Button, Card, Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const LeftContent = () => {
    return (
      <Avatar.Image size={70} style={{ marginTop: 50, backgroundColor: "gray" }} source={require('../assets/images/player1.png')} />
    );
}

const HomeScreen = ({ addToFavorites, removeFromFavorites, isFavorite, navigation }) => {
    
      const [data, setData] = useState([]);
      const [isLoading, setIsLoading] = useState(true);
    
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
      
      const handleMatchPress = (id) => {
        navigation.navigate('MatchDetails', { id });
        console.log("presss", id )
      };
      
    
      const fetchFootball = async () => {
        axios.request(options)
        .then(res => {
          const footballData = res.data.data;
          console.log(footballData);
          setData(footballData)
          setIsLoading(false);
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
      {isLoading ? (
        <ActivityIndicator style={{marginTop: 380}} size="large" color="#0000ff" />
      ) : (
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
             <View key={item.id} style={{backgroundColor:'white', borderWidth: 1, borderColor: 'black', borderStyle: 'solid', borderRadius: 10, marginBottom:10}}>
             <View
               style={{
                 flexDirection: 'row',
                 justifyContent: 'space-around',
                 marginTop: 10,
               }}
             >
               
               {item.participants.map((team, index) => (
                 <React.Fragment key={team.id}>
                   
                   
                   {index !== 0 && <Text style={{ marginTop:30, fontWeight: 'bold', fontSize:22 }}>vs</Text>}
           
                   <View key={team.id} style={{ alignItems: 'center', marginTop:10 }}>
                     <Image
                       source={{ uri: team.image_path }}
                       style={{ width: 50, height: 50 }}
                     />
                     <Text style={{fontWeight: 'bold', fontSize:16}} >{team.name.substring(0, 3)}</Text>
                   </View>
                 </React.Fragment>
               ))}
             </View>
           
             <View style={{ alignItems: 'center', justifyContent: 'center' }}>
               <Text>{item.starting_at}</Text>
             </View>
           
             <Button onPress={() => handleMatchPress(item.id)}>
               <Text style={{fontWeight: 'bold', fontSize:20}}>see details</Text>
             </Button>
           
           </View>
           

            ))}
      </ScrollView>
       )}
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
});

const mapDispatchToProps = (dispatch) => ({
  addToFavorites: (item) => dispatch({ type: 'ADD_FAVORITE', payload: item }),
  removeFromFavorites: (item) => dispatch({ type: 'REMOVE_FAVORITE', payload: item })
});
export default connect(null, mapDispatchToProps)(HomeScreen); 