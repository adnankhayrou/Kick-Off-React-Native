import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ActivityIndicator, Button, Text } from 'react-native-paper';
import {DataContext} from '../context/DataProvider';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const { addToFavorite, loadFavorites, favorites} = useContext(DataContext);

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const matchOptions = {
    method: 'GET',
    url: 'https://api.sportmonks.com/v3/football/fixtures?include=participants',
    headers: {
      'authorization': 'GLAB8uX2Q6e574s1cIvoJKuH7i3loCiRwUMrApyw7pp1xzUp47RBmJt35abe'
    }
  };

  const filterOptions = {
    method: 'GET',
    url: 'https://api.sportmonks.com/v3/football/fixtures/head-to-head/2650/293?include=participants',
    headers: {
      'authorization': 'GLAB8uX2Q6e574s1cIvoJKuH7i3loCiRwUMrApyw7pp1xzUp47RBmJt35abe'
    }
  };
  
  const handleMatchPress = (id) => {
    navigation.navigate('MatchDetails', { id });
    // console.log("presss", id )
  };
  
  const felterFootball = async () => {
    // console.log('hello');
    setIsLoading(true);
    axios.request(filterOptions)
    .then(res => {
      const footballData = res.data.data;
      // console.log(footballData);
      setData(footballData)
      setIsLoading(false);
    })
    .catch(error => {
      console.error('Error occurred:', error.message);
    });
  };

  const fetchFootball = async () => {
    setIsLoading(true);
    axios.request(matchOptions)
    .then(res => {
      const footballData = res.data.data;
      // console.log(footballData);
      setData(footballData)
      setIsLoading(false);
    })
    .catch(error => {
      console.error('Error occurred:', error.message);
    });
  };

  useEffect(() => {
    fetchFootball();
    loadFavorites();
  }, []);

  return (
    <View style={styles.container}>

      <View style={{ display:"flex", flexDirection:"row" , backgroundColor: 'white'}}>
        <TouchableOpacity 
          style={{ 
            width:'30%',
            backgroundColor: 'gray', 
            borderRadius: 12,
            margin: 2,
            alignItems: 'center',
            justifyContent: 'center',
            marginStart: 10,
          }} 
          onPress={() => fetchFootball()}
        >
          <Text style={{ fontWeight: 'bold', color:'white' }}>All Matches</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={{ 
            width:'40%',
            backgroundColor: 'gray', 
            borderRadius:12,
            padding: 6,
            margin: 2,
            alignItems: 'center',
            justifyContent: 'center',
          }} 
          onPress={() => felterFootball()}
        >
          <Text style={{ fontWeight: 'bold', color:'white' }}>Head To Head Matches</Text>
        </TouchableOpacity>
      </View>
      
      {isLoading ? (
        <ActivityIndicator style={{marginTop: 300}} size="large" color="#0000ff" />
      ) : (
        
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingVertical: 5,
        }}
      >
        {Array.isArray(data) && data.map((item) => (
             <View key={item.id} style={{backgroundColor: 'white', borderRadius: 10, marginBottom:10,shadowColor: '#000',
             shadowOpacity: 1,
             shadowRadius: 50,
             elevation: 10,}}>

              {favorites.some(favorite => favorite.id === item.id) && (
               <View style={{marginStart: 360, marginTop: 6}}>
                 <Ionicons name={'heart'} size={20} color="red" />
               </View>
              )}

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
                     <Text style={{fontWeight: 'bold', fontSize:16}} >{team.short_code}</Text>
                   </View>
                 </React.Fragment>
               ))}
             </View>
           
             <View style={{ alignItems: 'center', justifyContent: 'center' , marginVertical: 10}}>
               <Text>{item.starting_at}</Text>
             </View>

              <View style={{ display:"flex", flexDirection:"row", justifyContent:'space-around'}}>
                <Button style={{margin:6}} icon="eye"  textColor="purple" onPress={() => handleMatchPress(item.id)}>
                  See Details
                </Button>
                <Button style={{margin:6}} icon="plus"  textColor="green" onPress={() => addToFavorite(item)}>
                  Save Match
                </Button>
              </View>


           </View> 
            ))}
      </ScrollView>
       )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
});

export default HomeScreen; 