import { SearchIcon } from '@/assets/icons';
import { HText, Input } from '@/src/components/common';
import { getMetrics } from '@/src/helpers/utils';
import MainLayout from '@/src/layouts/main_layout';
import { useUserStore } from '@/src/stores/zustand';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const Home = () => {
  const { user } = useUserStore();

  return (
    <MainLayout edges={['top']}>
      <View
        style={[styles.container]}
        className={`flex-1`}
      >
        <HText size='header1' className={`capitalize`}>
          Hello, {user?.username ?? ""}
        </HText>

        <Input
          placeholder='Search Clients By Name'
          iconLeft={<SearchIcon />}
          alt
        />
      </View>
    </MainLayout>
  )
}

export default Home;

const styles = StyleSheet.create({
  container: {
    paddingTop: getMetrics(17),
    gap: getMetrics(25),
  }
});
