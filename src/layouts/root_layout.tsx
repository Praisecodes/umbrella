import React from 'react';
import { StyleSheet } from 'react-native';
import { Edges, SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  children: React.ReactNode;
  edges?: Edges;
}

const RootLayout: React.FC<Props> = ({ children, edges }) => {
  return (
    <SafeAreaView edges={edges} className={`flex-1`}>
      {children}
    </SafeAreaView>
  )
}

export default RootLayout;

const styles = StyleSheet.create({});
