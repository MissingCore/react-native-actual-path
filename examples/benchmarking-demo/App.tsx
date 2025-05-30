import * as FileSystem from 'expo-file-system';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import type { TextProps } from 'react-native';
import { StyleSheet, Text as RNText, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { getActualPath } from '@missingcore/react-native-actual-path';

export default function RootLayer() {
  return (
    <SafeAreaProvider>
      <Container>
        <App />
      </Container>
    </SafeAreaProvider>
  );
}

export function App() {
  return (
    <>
      <Text style={styles.heading}>
        Hello
      </Text>
    </>
  );
}

function Container({ children }: { children: React.ReactNode }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top + 64 }]}>
      <StatusBar style="dark" />
      {children}
    </View>
  );
}
function Text({ style, ...props }: TextProps) {
  // eslint-disable-next-line react-native/no-inline-styles
  return <RNText style={[{ color: 'black' }, style]} {...props} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
    backgroundColor: '#ffffff',
  },
  heading: {
    marginHorizontal: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  text: {
    marginHorizontal: 16,
    textAlign: 'center',
  },
  metadataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 8,
    margin: 8,
    borderRadius: 16,
    backgroundColor: '#ebebeb',
    elevation: 4,
  },
  image: {
    width: 150,
    height: 150,
    backgroundColor: '#bdbdbd',
    borderRadius: 12,
  },
  infoContainer: {
    flex: 1,
  },
  bold: {
    fontWeight: 'bold',
  },
});
