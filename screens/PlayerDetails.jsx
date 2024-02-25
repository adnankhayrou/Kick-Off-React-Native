import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Image, TouchableOpacity, ImageBackground, View } from 'react-native'
import { ActivityIndicator, Text } from 'react-native-paper'

const PlayerDetails = ({ route, navigation }) => {
  const { id } = route.params;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const options = {
    method: 'GET',
    url: `https://api.sportmonks.com/v3/football/players/${id}?include=position;nationality`,
    headers: {
      'authorization': 'GLAB8uX2Q6e574s1cIvoJKuH7i3loCiRwUMrApyw7pp1xzUp47RBmJt35abe'
    }
  };

  const fetchFootball = async () => {
    axios.request(options)
    .then(res => {
      const footballData = res.data.data;
      // console.log('in the details', footballData);
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

  function allPlayers() {
      navigation.navigate('Players');
  }

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator style={{paddingTop: 350}} size="large" color="#0000ff" />
      ) : (
    <View>
      <ImageBackground source={{ uri: data.nationality.image_path }} style={{ borderRadius: 10, overflow: 'hidden', shadowColor: '#000',
          shadowOpacity: 1,
          shadowRadius: 50,
          elevation: 10,
          padding: 5,
          margin: 5,
          marginVertical: 6,
          width: 400,
          height: 180,}}>
      <View style={{
          padding: 5,
          margin: 5,
          width: 400,
          height: 180,
          marginTop: 25,
          overflow: "hidden",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ width: "55%" }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              padding: 5,
              marginLeft: 6,
            }}
          >
            <Image
              source={{ uri: data.image_path }}
              style={{ width: 90, height: 90, borderRadius: 20 }}
            />
          </View>
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
          shadowOpacity: 1,
          shadowRadius: 50,
          elevation: 10,
        }}
      >
        <View style={{ width: "80%" }}>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
            <Text style={{ marginTop: 20, fontWeight: 'bold', fontSize: 20 }}>
              Player Information
            </Text>
          </View>

          {[
            { label: "First Name", value: data.firstname },
            { label: "Last Name", value: data.lastname },
            { label: "Common Name", value: data.common_name },
            { label: "Country", value: data.nationality.name },
            { label: "Position", value: data.position?.name },
            { label: "Height", value: `${data.height} cm` },
            { label: "Weight", value: `${data.weight} kg` },
            { label: "Date of Birth", value: data.date_of_birth },
            { label: "Gender", value: data.gender }
          ].map((item, index) => (
            <View key={index} style={{ marginVertical: 8 }}>
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
                marginLeft: 80,
                borderColor: 'black'
              }}
              onPress={() => allPlayers()}>
              <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>See All Players</Text>
            </TouchableOpacity>
          </View>
        </View>

       </View>

      </View>
       )}
    </View>
  )
}


export default PlayerDetails