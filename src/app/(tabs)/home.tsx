import MainLayout from '@/src/layouts/main_layout';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Home = () => {
  return (
    <MainLayout edges={['top']}>
      <View>
        <Text>Home</Text>
      </View>
    </MainLayout>
  )
}

export default Home;

const styles = StyleSheet.create({});
