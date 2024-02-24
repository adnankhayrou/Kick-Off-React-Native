import React, { useEffect } from 'react'
import { Dimensions, ImageBackground, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
const { height } = Dimensions.get("window");

const WelcomeScreen = ({ navigation }) => {

  useEffect(() => {
    navigateTo(navigation);
  }, []);

  function navigateTo() {
    setTimeout(() => {
      navigation.navigate('MainTabs');
    }, 6000);
  }


    
  return (
    <SafeAreaView style={{ backgroundColor: 'white', height: "100%"}}>
        <LinearGradient
          colors={['black', '#999', 'white']}
          style={{ flex: 1 }}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
        <View style={{
              paddingHorizontal: 40,
              paddingTop: 200,
            }}>
          
          <View
            style={{
              paddingTop: 50,
            }}>
            <Text
              style={{
                fontSize: 35,
                color: 'white',
                fontWeight: 'bold',
                textAlign: "center",
              }}>
                KickOff
            </Text>
  

            <ImageBackground
            style={{
              height: height /2,
            }}
            resizeMode="contain"
            source={require("../assets/images/player2.png")}/>

            <Text
              style={{
                fontSize: 10,
                color: '#000',
                fontWeight:'bold',
                textAlign: "center",
                marginTop: 30,
              }}>
              Keep Updated With KickOff News...
            </Text>
          </View>
        </View>
      </LinearGradient>
      </SafeAreaView>
  )
}

export default WelcomeScreen