# @missingcore/react-native-actual-path

[<img src="https://img.shields.io/npm/v/@missingcore/react-native-actual-path?style=for-the-badge&labelColor=000000" alt="NPM Version"/>](https://www.npmjs.com/package/@missingcore/react-native-actual-path)
[<img src="https://img.shields.io/npm/l/@missingcore/react-native-actual-path?style=for-the-badge&labelColor=000000" alt="License"/>](./LICENSE)

A port of [`react-native-actual-path`](https://github.com/SolankiYogesh/react-native-real-path) that supports both the new & old architectures.

## Installation

```sh
npm install @missingcore/react-native-actual-path
```

## Usage

> [!IMPORTANT]
> This might not work directly with the `content://` URI returned from `expo-file-system`'s `StorageAccessFramework.requestDirectoryPermissionsAsync()`. Below is an example on how to get around this.

```ts
import { getActualPath } from '@missingcore/react-native-actual-path';
import { StorageAccessFramework as SAF } from 'expo-file-system';

export async function getDirLocation() {
  const permissions = await SAF.requestDirectoryPermissionsAsync();
  if (!permissions.granted) return null;
  try {
    const dirContents = await SAF.readDirectoryAsync(permissions.directoryUri);
    const dirItem = dirContents[0];
    if (!dirItem) throw new Error('No items found in directory.');
    const resolved = await getActualPath(dirItem);
    return resolved ? resolved.split('/').slice(0, -1).join('/') : null;
  } catch (err) {
    console.log(err);
    return null;
  }
}
```

## References

- [react-native-actual-path](https://github.com/SolankiYogesh/react-native-real-path)

## License

[MIT](./LICENSE)
