import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { ActivityIndicator, Button, Text } from 'react-native-paper'

const PlayersScreen = ({navigation}) => {
    const [data, setData] = useState([]);
      const [isLoading, setIsLoading] = useState(true);
    
      const playerOptions = {
        method: 'GET',
        url: 'https://api.sportmonks.com/v3/football/players',
        headers: {
          'authorization': 'GLAB8uX2Q6e574s1cIvoJKuH7i3loCiRwUMrApyw7pp1xzUp47RBmJt35abe'
        }
      };

      const filterOptions = {
        method: 'GET',
        url: 'https://api.sportmonks.com/v3/football/fixtures/head-to-head/2650/86?include=participants',
        headers: {
          'authorization': 'GLAB8uX2Q6e574s1cIvoJKuH7i3loCiRwUMrApyw7pp1xzUp47RBmJt35abe'
        }
      };

      
      const handlePlayerPress = (id) => {
        navigation.navigate('PlayerDetails', { id });
        console.log("presss", id )
      };
      
    
      const playerSearch = async () => {
        console.log('hello');
        setIsLoading(true);
        axios.request(playerSearch)
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

      const fetchPlayers = async () => {
        setIsLoading(true);
        axios.request(playerOptions)
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
        fetchPlayers();
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
            marginStart: 10
           
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
            padding: 7,
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
            <View key={item.id}>
            <View
              style={{
                padding: 5,
                margin: 5,
                height: 100,
                marginTop: 10,
                overflow: "hidden",
                borderRadius: 10,
                borderWidth: 1,
                borderColor: 'white',
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor:'black'
              }}
            >
              <View style={{ width: "50%" }}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 5,
                    marginLeft: 20,
                  }}
                >
                  <Image
                    source={{ uri: item.image_path }}
                    style={{ width: 70, height: 70, borderRadius: 20 }}
                  />
                  <Text style={{ color: 'white', fontSize: 15, marginLeft: 20 }}>
                    {item.common_name}
                  </Text>
                </View>
              </View>
      
              <View
                style={{
                  width: "1%",
                  borderColor: 'white',
                  borderEndWidth: 2,
                  borderRadius: 10,
                  height: "70%",
                }}
              ></View>
      
              <View style={{ width: "40%" }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 15,
                    marginRight: 10,
                    textAlign: "center",
                  }}>
      
                  ---->
                </Text>
                
                <Text style={{ color: 'white', fontSize: 15, marginLeft: 30 }}>
                  See Details
                </Text>
              </View>
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

export default PlayersScreen