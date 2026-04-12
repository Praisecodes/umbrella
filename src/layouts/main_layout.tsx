import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Edges } from 'react-native-safe-area-context';
import { getMetrics } from '../helpers/utils';
import RootLayout from './root_layout';

interface Props {
  children: React.ReactNode;
  edges?: Edges;
  scrollView?: boolean;
  noPadding?: boolean;
}

const MainLayout: React.FC<Props> = ({ children, edges, noPadding, scrollView = true }) => {
  return (
    <RootLayout edges={edges}>
      {scrollView && (
        <ScrollView
          contentContainerStyle={[styles.container, {
            paddingBottom: getMetrics(20),
            flexGrow: 1,
            ...(noPadding && ({ paddingHorizontal: 0 })),
          }]}
          children={children}
        />
      )}

      {!scrollView && (
        <View
          style={[styles.container, {
            flex: 1,
            ...(noPadding && ({ paddingHorizontal: 0 })),
            paddingBottom: 0,
          }]}
          children={children}
        />
      )}
    </RootLayout>
  )
}

export default MainLayout;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: getMetrics(16),
    paddingBottom: getMetrics(20),
  }
});
