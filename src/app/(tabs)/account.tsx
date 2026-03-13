import MainLayout from '@/src/layouts/main_layout';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Account = () => {
  return (
    <MainLayout edges={["top"]}>
      <View>
        <Text>Account</Text>
      </View>
    </MainLayout>
  )
}

export default Account;

const styles = StyleSheet.create({});
