import { Button } from '@/src/components/common';
import { getMetrics } from '@/src/helpers/utils';
import MainLayout from '@/src/layouts/main_layout';
import { useUserStore } from '@/src/stores/zustand';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const Account = () => {
  const { clearUser } = useUserStore();

  const handleLogout = () => {
    clearUser();
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
