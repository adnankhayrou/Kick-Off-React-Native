import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Text>
            MatchDetails
          </Text>
          <Text>
            ID: {id}
          </Text>
        </>
      )}
    </View>
  )
}

export default MatchDetails