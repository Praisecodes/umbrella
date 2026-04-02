import { Button } from '@/src/components/common';
import { getMetrics } from '@/src/helpers/utils';
import MainLayout from '@/src/layouts/main_layout';
import { authService } from '@/src/services';
import { useUserStore } from '@/src/stores/zustand';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { toast } from 'sonner-native';

const Account = () => {
  const { clearUser } = useUserStore();
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogout = async () => {
    setLoading(true);
    const { error } = await authService.signOut();
    if (error) {
      toast.error("Error Signin Out");
    } else {
      clearUser();
    }

    setLoading(false);
  }

  return (
    <MainLayout edges={["top"]}>
      <View style={[styles.container]} className={`flex-1`}>
        <Button
          onPress={handleLogout}
          text='Logout'
          loading={loading}
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
