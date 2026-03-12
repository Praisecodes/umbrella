import React from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native';
import { Edges } from 'react-native-safe-area-context';
import { getMetrics } from '../helpers/utils';
import RootLayout from './root_layout';

interface Props {
  edges?: Edges;
  children: React.ReactNode;
}

const AuthLayout: React.FC<Props> = ({ edges, children }) => {
  return (
    <RootLayout edges={edges}>
      <KeyboardAvoidingView
        className={`flex-1`}
        behavior='padding'
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: getMetrics(16),
          }}
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </RootLayout>
  )
}

export default AuthLayout;

const styles = StyleSheet.create({});
