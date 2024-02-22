import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

const PlayerDetails = ({ route }) => {
  const { id } = route.params;
  return (
    <View>
      <View
        style={{
          padding: 5,
          margin: 5,
          width: 400,
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
              source={require("../assets/images/player2.png")}
              style={{ width: 30, height: 30, borderRadius: 20 }}
            />
            <Text style={{ color: 'white', fontSize: 15, marginLeft: 20 }}>
              PSG {id}
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
              marginLeft: 10,
              textAlign: "center",
            }}>

            2Esbjerg won after full-time.
          </Text>
          <Text style={{ color: 'white', fontSize: 15, marginLeft: 10 }}>
            2006-03-25 16:00:00
          </Text>
        </View>
      </View>
    </View>
  )
}


export default PlayerDetails