import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Index = () => {
  const { } = useLocalSearchParams();
  
  return (
    <View>
      <Text>Index</Text>
    </View>
  )
}

export default Index;

const styles = StyleSheet.create({});
