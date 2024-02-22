import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, View } from 'react-native'
import { ActivityIndicator, Button, Searchbar, Text } from 'react-native-paper'

const PlayersScreen = ({navigation}) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    
      const playerOptions = {
        method: 'GET',
        url: 'https://api.sportmonks.com/v3/football/players',
        headers: {
          'authorization': 'GLAB8uX2Q6e574s1cIvoJKuH7i3loCiRwUMrApyw7pp1xzUp47RBmJt35abe'
        }
      };

      const filterOptions = {
        method: 'GET',
        url: `https://api.sportmonks.com/v3/football/players/search/${searchQuery}`,
        headers: {
          'authorization': 'GLAB8uX2Q6e574s1cIvoJKuH7i3loCiRwUMrApyw7pp1xzUp47RBmJt35abe'
        }
      };

      
      const handlePlayerPress = (id) => {
        navigation.navigate('PlayerDetails', { id });
        console.log("presss", id )
      };
      
    
      const playerSearch = async () => {
        if(searchQuery.length > 0){
            console.log('hello');
        setIsLoading(true);
        await axios.request(filterOptions)
        .then(res => {
          const footballData = res.data.data;
          console.log(footballData);
          setData(footballData)
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error occurred:', error.message);
        });
        }
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

      <View style={{backgroundColor: 'white', margin:10}}>
        <Searchbar  placeholder="Search" onChange={playerSearch} onChangeText={(text) => setSearchQuery(text)}  value={searchQuery}/>
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
                backgroundColor:'gray'
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
              <Button  onPress={() => handlePlayerPress(item.id)}>
                <View style={{ width: "40%" }}>
                    <Text style={{ color: 'white', marginRight: 20, fontWeight: 'bold' }}>
                    See Details
                    </Text>
                </View>
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

export default PlayersScreen