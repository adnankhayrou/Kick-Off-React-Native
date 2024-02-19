import React from 'react'
import { Dimensions, ImageBackground, SafeAreaView, Text, TouchableOpacity, View } from "react-native";


const { height } = Dimensions.get("window");
const WelcomeScreen = ({ navigation }) => {

 function navigateTo() {
    navigation.navigate('Home');
 }
    
  return (
    <SafeAreaView style={{
        backgroundColor: 'white',
        height:"100%"
      }}>
        <View style={{
              paddingHorizontal: 40,
              paddingTop: 100,
            }}>
          <ImageBackground
            style={{
              height: height / 3,
            }}
            resizeMode="contain"
            source={require("../assets/images/player.jpg")}
          />
          <View
            style={{
              paddingHorizontal: 40,
              paddingTop: 40,
            }}
          >
            <Text
              style={{
                fontSize: 35,
                color: 'red',
                textAlign: "center",
              }}
            >
              Welcome to Kick off
            </Text>
  
            <Text
              style={{
                fontSize: 14,
                color: '#000',
                textAlign: "center",
                marginTop: 20,
              }}
            >
              bfurbubrubfuurbfur .
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: 20,
              paddingTop: 60,
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              onPress={() => navigateTo()}
              style={{
                backgroundColor: '#008083',
                paddingVertical: 15,
                paddingHorizontal: 20,
                width: "100%",
                borderRadius: 10,
                shadowColor: '#1F41BB',
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowOpacity: 0.3,
                shadowRadius: 10,
              }}
            >
              <Text
                style={{
                  color:' #fff',
                  fontSize: 20,
                  textAlign: "center",
                }}
              >
                Start
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
  )
}

export default WelcomeScreen