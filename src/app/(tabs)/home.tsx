import { SearchIcon } from '@/assets/icons';
import { HText, Input, Text } from '@/src/components/common';
import { getMetrics } from '@/src/helpers/utils';
import MainLayout from '@/src/layouts/main_layout';
import { clientsService } from '@/src/services';
import { useUserStore } from '@/src/stores/zustand';
import { useQuery } from '@tanstack/react-query';
import React, { useCallback } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, TouchableOpacity, View } from 'react-native';

const Home = () => {
  const { user } = useUserStore();

  const { data, isPending, isRefetching, refetch } = useQuery({
    queryKey: ["get_clients"],
    queryFn: async () => clientsService.getAllClients(),
    select: (data) => data.data.data.clients as IClient[],
  });

  const handleAddNewClient = async () => { }

  const ListHeaderComponent = useCallback(() => {
    return (
      <View style={{ gap: getMetrics(25) }}>
        <HText size='header1' className={`capitalize`}>
          Hello, {user?.username ?? ""}
        </HText>

        <Input
          placeholder='Search Clients By Name'
          iconLeft={<SearchIcon />}
          alt
        />

        {(isPending || !data) && (
          <View className={`py-36 flex items-center justify-center`}>
            <ActivityIndicator />

            <Text size='15' className={`text-black-a50 text-center`}>
              Loading Clients...
            </Text>
          </View>
        )}
      </View>
    )
  }, [isPending, data]);

  const ListEmptyComponent = useCallback(() => {
    return (isPending || !data) ? null : (
      <View style={{ gap: getMetrics(10) }} className={`py-36 flex items-center justify-center`}>
        <Text size='18' weight='medium' className={`text-black-a50`}>
          No Clients Found!
        </Text>

        <TouchableOpacity onPress={handleAddNewClient}>
          <View style={[styles.addClientBtn]} className={`bg-primary`}>
            <Text size='13' className={`text-white`}>
              Add New Client
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }, [data, isPending]);

  return (
    <MainLayout noPadding scrollView={false} edges={['top']}>
      <FlatList
        contentContainerStyle={[styles.container]}
        refreshControl={<RefreshControl onRefresh={refetch} refreshing={isRefetching} />}
        data={data}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={ListEmptyComponent}
        renderItem={({ item }) => (
          <></>
        )}
        keyExtractor={(_, index) => index.toString()}
      />
    </MainLayout>
  )
}

export default Home;

const styles = StyleSheet.create({
  container: {
    paddingTop: getMetrics(17),
    gap: getMetrics(25),
    flexGrow: 1,
    paddingHorizontal: getMetrics(16),
  },
  addClientBtn: {
    borderRadius: getMetrics(8),
    paddingHorizontal: getMetrics(20),
    paddingVertical: getMetrics(10),
  }
});
