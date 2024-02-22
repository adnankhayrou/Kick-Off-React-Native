import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Image, ImageBackground, StyleSheet, View } from 'react-native'
import { ActivityIndicator, Text } from 'react-native-paper'

const MatchDetails = ({ route }) => {
  const { id } = route.params;

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const options = {
    method: 'GET',
    url: `https://api.sportmonks.com/v3/football/fixtures/${id}?include=participants`,
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

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View >
          
          <ImageBackground source={require("../assets/images/stadium.jpg")} style={{ margin:5, borderRadius: 10, overflow: 'hidden'}}>
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
                      <Text style={{fontWeight: 'bold', fontSize:20, color:'white'}} >{team.name}</Text>
                    </View>
                  </React.Fragment>
                ))}
              </View>
            
              <View style={{ alignItems: 'center', justifyContent: 'center' , marginBottom: 6, marginTop: 10}}>
                <Text style={{fontWeight: 'bold', fontSize:20, color:'white'}}>{data.starting_at}</Text>
              </View>

            </View> 
           </ImageBackground>

            <View style={{alignItems: 'center', justifyContent: 'center' , marginBottom: 8}}>
              <Text style={{ marginTop:20, fontWeight: 'bold', fontSize:20 }}>
                Match Details
              </Text>
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