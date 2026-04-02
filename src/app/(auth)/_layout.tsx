import { useUserStore } from '@/src/stores/zustand';
import { Redirect, Stack } from 'expo-router';
import React from 'react';

const Layout = () => {
  const { user, session } = useUserStore();

  if (!!user && !!session) return <Redirect href={"/(tabs)/home"} />

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  )
}

export default Layout;
