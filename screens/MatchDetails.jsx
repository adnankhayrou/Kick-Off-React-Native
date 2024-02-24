import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Image, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native'
import { ActivityIndicator, Text } from 'react-native-paper'

const MatchDetails = ({ route, navigation }) => {
  const { id } = route.params;

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  

  const options = {
    method: 'GET',
    url: `https://api.sportmonks.com/v3/football/fixtures/${id}?include=league;participants;venue;league`,
    headers: {
      'authorization': 'GLAB8uX2Q6e574s1cIvoJKuH7i3loCiRwUMrApyw7pp1xzUp47RBmJt35abe'
    }
  };

  const fetchFootball = async () => {
    axios.request(options)
    .then(res => {
      const footballData = res.data.data;
      console.log('in the details', footballData);
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

  function allMatchs() {
    navigation.navigate('Matches');
}

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View >
          
          <ImageBackground source={require("../assets/images/stadium.jpg")} style={{ margin:5, borderRadius: 10, overflow: 'hidden', shadowColor: '#000',
              shadowOpacity: 1,
              shadowRadius: 50,
              elevation: 10,}}>

            <View key={data.id} style={{marginBottom:10, borderRadius: 20}}>

              <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20}}>       
                {data.participants.map((team, index) => (
                  <React.Fragment key={team.id}>
                    {index !== 0 && <Text style={{ marginTop:30, fontWeight: 'bold', fontSize:30, color:'blue' }}>vs</Text>}
            
                    <View key={team.id} style={{ alignItems: 'center', marginTop:10 }}>
                      <Image
                        source={{ uri: team.image_path }}
                        style={{ width: 70, height: 70 }}
                      />
                      <Text style={{fontWeight: 'bold', fontSize:20, color:'white'}} >{team.short_code}</Text>
                    </View>
                  </React.Fragment>
                ))}
              </View>
            
              <View style={{ alignItems: 'center', justifyContent: 'center' , marginBottom: 6, marginTop: 10}}>
                <Text style={{fontWeight: 'bold', fontSize:20, color:'white'}}>{data.starting_at}</Text>
              </View>

            </View> 
           </ImageBackground>

           <View
            style={{
              padding: 5,
              margin: 5,
              width: 400,
              marginTop: 10,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: 'white',
              display: "flex",
              alignItems: "center",
              backgroundColor:'white',
              shadowColor: '#000',
              shadowOpacity: 2,
              shadowRadius: 50,
              elevation: 10,
            }}
          >

           <View style={{ width: "90%" }}>
              {/* Player Informations Header */}
              <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                <Text style={{ marginTop: 20, fontWeight: 'bold', fontSize: 20 }}>
                  Match Information
                </Text>
              </View>

              {/* Individual Player Information Items */}
              {[
                { label: "League", value: data.league.name },
                { label: "League Sub Type", value: data.league.sub_type },
                { label: "League Short Code", value: data.league.short_code },
                { label: "Last Played at", value: data.league.last_played_at },
                { label: "Venue Name", value: data.venue.name },
                { label: "Venue Address", value: data.venue.address },
                { label: "Venue City Name", value: data.venue.city_name },
                { label: "Venue Capacity", value: data.venue.capacity },
                { label: "Venue Surface", value: data.venue.surface },
              ].map((item, index) => (
                <View key={index} style={{ marginVertical: 8 }}>
                  {/* Individual Player Information Item */}
                  <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 5 }}>
                    <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 15 }}>
                      {item.label}
                    </Text>
                    <Text style={{ fontWeight: 'bold', color: 'gray', fontSize: 15, marginLeft: 20 }}>
                      {item.value}
                    </Text>
                  </View>
                  <View style={{ width: '100%', borderColor: 'white', borderBottomWidth: 1, borderRadius: 10, height: 2, marginRight: 50 }} />
                </View>
              ))}

              {/* Button to See All Players */}
              <View style={{ marginVertical: 8, padding: 5 }}>
                <TouchableOpacity
                  style={{
                    width: '50%',
                    backgroundColor: 'black',
                    borderRadius: 12,
                    margin: 2,
                    padding: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 84,
                    borderColor: 'black'
                  }}
                  onPress={() => allMatchs()}>
                  <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>See All Matchs</Text>
                </TouchableOpacity>
              </View>
            </View>
            </View>


        </View>
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

export default MatchDetails