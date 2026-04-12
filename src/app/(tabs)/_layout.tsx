import { useUserStore } from '@/src/stores/zustand';
import { Redirect, Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

const Layout = () => {
  const { user } = useUserStore();

  if (!user) return <Redirect href={"/(auth)/login"} />

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: {
          backgroundColor: "#FFFFFF"
        }
      }}
    >
      <Tabs.Screen
        name="home"
      />

      <Tabs.Screen
        name="account"
      />
    </Tabs>
  )
}

export default Layout;

const styles = StyleSheet.create({})