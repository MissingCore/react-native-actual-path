import ActualPath from './ActualPath';

/** Attempts to get the actual path from `content://` URIs. */
export function getActualPath(uri: string): Promise<string | null> {
  return ActualPath.getActualPath(uri);
}
