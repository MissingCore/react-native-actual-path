import { StorageAccessFramework as SAF } from 'expo-file-system';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useState } from 'react';
import type { TextProps } from 'react-native';
import { StyleSheet, Pressable, Text as RNText, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { getActualPath } from '@missingcore/react-native-actual-path';

export default function Root() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <App />
    </SafeAreaProvider>
  );
}

function App() {
  const insets = useSafeAreaInsets();

  const [contentUri, setContentUri] = useState<string | null>(null);
  const [resolvedUri, setResolvedUri] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const pickPath = useCallback(async () => {
    const permissions = await SAF.requestDirectoryPermissionsAsync();
    if (!permissions.granted) return;
    setContentUri(permissions.directoryUri);
    try {
      const dirContents = await SAF.readDirectoryAsync(
        permissions.directoryUri
      );
      const dirItem = dirContents[0];
      if (!dirItem) throw new Error('No items found in directory.');
      const resolved = await getActualPath(dirItem);
      setResolvedUri(resolved.split('/').slice(0, -1).join('/'));
    } catch (err) {
      console.log(err);
      setError(err as Error);
    }
  }, []);

  return (
    <View style={[styles.container, { paddingTop: insets.top + 64 }]}>
      <Pressable onPress={pickPath} style={styles.button}>
        <Text style={{ color: 'white' }}>Pick Directory</Text>
      </Pressable>
      <View>
        <Text style={styles.heading}>Content URI</Text>
        <Text>{contentUri}</Text>
      </View>
      <View>
        <Text style={styles.heading}>Resolved URI</Text>
        <Text>{resolvedUri}</Text>
      </View>
      <View>
        <Text style={styles.heading}>Error</Text>
        <Text>{error?.message}</Text>
      </View>
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
    alignItems: 'center',
    gap: 32,
    backgroundColor: '#ffffff',
  },
  button: {
    padding: 16,
    backgroundColor: '#2255e3',
    borderRadius: 16,
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
});
