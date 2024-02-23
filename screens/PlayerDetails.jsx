import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
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

  function allPlayers() {
      navigation.navigate('Players');
  }

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
    <View>
      <View
        style={{
          padding: 5,
          margin: 5,
          width: 400,
          height: 180,
          marginTop: 25,
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
        <View style={{ width: "55%" }}>
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
              source={{ uri: data.image_path }}
              style={{ width: 70, height: 70, borderRadius: 20 }}
            />
            <Text style={{ color: 'white', fontSize: 15, marginLeft: 20 }}>
              {data.common_name}
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

        <View style={{ width: "40%"}}>
          <Image
              source={{ uri: data.nationality.image_path }}
              style={{ width: 50, height: 50, borderRadius: 20, marginLeft: 50}}
            />
        </View>
      </View>

      

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
          backgroundColor:'gray'
        }}
      >
        <View style={{ width: "80%" }}>

          <View style={{alignItems: 'center', justifyContent: 'center' , marginBottom: 8}}>
            <Text style={{ marginTop:20, fontWeight: 'bold', fontSize:20 }}>
              Player Details
            </Text>
          </View>

          <View style={{marginVertical:8}}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent:'space-between',
                  padding: 5,
                }}>

                <Text style={{fontWeight:'bold', color: 'white', fontSize: 15 }}>
                  First Name
                </Text>
                <Text style={{fontWeight:'bold', color: 'white', fontSize: 15, marginLeft: 20 }}>
                  {data.firstname}
                </Text>

              </View>
            <View
              style={{
                width: '100%',
                borderColor: 'white',
                borderBottomWidth: 2,
                borderRadius: 10,
                height: 2,
                marginRight: 50,
              }}></View>
          </View>

          <View style={{marginVertical:8}}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent:'space-between',
                  padding: 5,
                }}>

                <Text style={{fontWeight:'bold', color: 'white', fontSize: 15 }}>
                  Last Name
                </Text>
                <Text style={{fontWeight:'bold', color: 'white', fontSize: 15, marginLeft: 20 }}>
                  {data.lastname}
                </Text>

              </View>
            <View
              style={{
                width: '100%',
                borderColor: 'white',
                borderBottomWidth: 2,
                borderRadius: 10,
                height: 2,
                marginRight: 50,
              }}></View>
          </View>

          <View style={{marginVertical:8}}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent:'space-between',
                  padding: 5,
                }}>

                <Text style={{fontWeight:'bold', color: 'white', fontSize: 15 }}>
                  Country
                </Text>
                <Text style={{fontWeight:'bold', color: 'white', fontSize: 15, marginLeft: 20 }}>
                  {data.nationality.name}
                </Text>

              </View>
            <View
              style={{
                width: '100%',
                borderColor: 'white',
                borderBottomWidth: 2,
                borderRadius: 10,
                height: 2,
                marginRight: 50,
              }}></View>
          </View>

          <View style={{marginVertical:8}}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent:'space-between',
                  padding: 5,
                }}>

                <Text style={{fontWeight:'bold', color: 'white', fontSize: 15 }}>
                  Position
                </Text>
                <Text style={{fontWeight:'bold', color: 'white', fontSize: 15, marginLeft: 20 }}>
                  {data.position.name}
                </Text>

              </View>
            <View
              style={{
                width: '100%',
                borderColor: 'white',
                borderBottomWidth: 2,
                borderRadius: 10,
                height: 2,
                marginRight: 50,
              }}></View>
          </View>

          <View style={{marginVertical:8}}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent:'space-between',
                  padding: 5,
                }}>

                <Text style={{fontWeight:'bold', color: 'white', fontSize: 15 }}>
                  Height
                </Text>
                <Text style={{fontWeight:'bold', color: 'white', fontSize: 15, marginLeft: 20 }}>
                  {data.height} cm
                </Text>

              </View>
            <View
              style={{
                width: '100%',
                borderColor: 'white',
                borderBottomWidth: 2,
                borderRadius: 10,
                height: 2,
                marginRight: 50,
              }}></View>
          </View>

          <View style={{marginVertical:8}}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent:'space-between',
                  padding: 5,
                }}>

                <Text style={{fontWeight:'bold', color: 'white', fontSize: 15 }}>
                  Weight
                </Text>
                <Text style={{fontWeight:'bold', color: 'white', fontSize: 15, marginLeft: 20 }}>
                  {data.weight} kg
                </Text>

              </View>
            <View
              style={{
                width: '100%',
                borderColor: 'white',
                borderBottomWidth: 2,
                borderRadius: 10,
                height: 2,
                marginRight: 50,
              }}></View>
          </View>

          <View style={{marginVertical:8}}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent:'space-between',
                  padding: 5,
                }}>

                <Text style={{fontWeight:'bold', color: 'white', fontSize: 15 }}>
                Date of Birth
                </Text>
                <Text style={{fontWeight:'bold', color: 'white', fontSize: 15, marginLeft: 20 }}>
                  {data.date_of_birth}
                </Text>

              </View>
            <View
              style={{
                width: '100%',
                borderColor: 'white',
                borderBottomWidth: 2,
                borderRadius: 10,
                height: 2,
                marginRight: 50,
              }}></View>
          </View>

          <View style={{marginVertical:8}}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent:'space-between',
                  padding: 5,
                }}>

                <Text style={{fontWeight:'bold', color: 'white', fontSize: 15 }}>
                Gender
                </Text>
                <Text style={{fontWeight:'bold', color: 'white', fontSize: 15, marginLeft: 20 }}>
                  {data.gender}
                </Text>

              </View>
            {/* <View
              style={{
                width: '100%',
                borderColor: 'white',
                borderBottomWidth: 2,
                borderRadius: 10,
                height: 2,
                marginRight: 50,
              }}></View> */}
          </View>

          <View style={{marginVertical:8, padding: 5 }}>

                <TouchableOpacity 
                style={{ 
                  width:'50%',
                  backgroundColor: 'black', 
                  borderRadius: 12,
                  margin: 2,
                  padding:10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 80,   
                  borderColor:'black'              
                }} 
                onPress={() => allPlayers()}>
                <Text style={{fontSize: 15, fontWeight: 'bold', color:'white' }}>See All Players</Text>
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