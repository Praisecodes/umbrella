import { Button } from '@/src/components/common';
import { EXPO_PUBLIC_ACCESS_TOKEN_KEY, EXPO_PUBLIC_REFRESH_TOKEN_KEY } from '@/src/helpers/env';
import { getMetrics } from '@/src/helpers/utils';
import MainLayout from '@/src/layouts/main_layout';
import { removeSecureData } from '@/src/stores/expo_secure_store';
import { useUserStore } from '@/src/stores/zustand';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const Account = () => {
  const { clearUser } = useUserStore();

  const handleLogout = async () => {
    if (await removeSecureData(EXPO_PUBLIC_ACCESS_TOKEN_KEY) && await removeSecureData(EXPO_PUBLIC_REFRESH_TOKEN_KEY)) {
      clearUser();
    }
  }

  return (
    <MainLayout edges={["top"]}>
      <View style={[styles.container]} className={`flex-1`}>
        <Button
          onPress={handleLogout}
          text='Logout'
        />
      </View>
    </MainLayout>
  )
}

export default Account;

const styles = StyleSheet.create({
  container: {
    paddingTop: getMetrics(17),
  }
});
