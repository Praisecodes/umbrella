import { useUserStore } from '@/src/stores/zustand';
import { Redirect, Stack } from 'expo-router';
import React from 'react';

const Layout = () => {
  const user = useUserStore(state => state.user);

  if (!!user && user.emailVerified) return <Redirect href={"/(tabs)/home"} />

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  )
}

export default Layout;
