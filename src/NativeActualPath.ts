import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  getActualPath(uri: string): Promise<string | null>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('ActualPath');
