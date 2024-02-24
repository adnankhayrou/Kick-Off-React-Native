import React, { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import {DataContext} from '../context/DataProvider';
import { ActivityIndicator, Button } from 'react-native-paper';


const FavoriteScreen = ({navigation}) => {

const { removeItem, loadFavorites } = useContext(DataContext);
const [data, setData] = useState([]);
const [isLoading, setIsLoading] = useState(true);

const handleMatchPress = (id) => {
  navigation.navigate('MatchDetails', { id });
};

  useEffect(() => {
    const fetchData = async () => {
        try {
            const getingData = await AsyncStorage.getItem('favorites');
            if (getingData) {
                const parsedData = JSON.parse(getingData);
                setData(parsedData);
                setIsLoading(false);
            } else {
                console.log('No favorites data found.');
            }
        } catch (error) {
            console.error('Error fetching favorites:', error);
        }
    };

    fetchData();
  }, [data]);

  
  return(
    <View style={styles.container}>
    
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

            <View style={{ display:"flex", flexDirection:"row", justifyContent:'space-around', alignItems:'center'}}>
              <Button style={{margin:6}} icon="eye"  textColor="purple" onPress={() => handleMatchPress(item.id)}>
                See Details
              </Button>
              <Button style={{margin:6}} icon="close"  textColor="red" onPress={() => removeItem(item)}>
                Remove Match
              </Button>
            </View>
            
         </View> 
          ))}
    </ScrollView>
     )}
  </View>
)};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
});

export default FavoriteScreen;