import React from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native';
import { Edges } from 'react-native-safe-area-context';
import { getMetrics } from '../helpers/utils';
import RootLayout from './root_layout';

interface Props {
  children: React.ReactNode;
  noPadding?: boolean;
  edges?: Edges;
}

const MainLayout: React.FC<Props> = ({ children, noPadding, edges }) => {
  return (
    <RootLayout edges={edges}>
      <KeyboardAvoidingView
        className={`flex-1`}
        behavior='padding'
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: noPadding ? 0 : getMetrics(20),
          }}
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </RootLayout>
  )
}

export default MainLayout;

const styles = StyleSheet.create({});
