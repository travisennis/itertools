/**
 * Bucket items into groups based on a key function
 */
export const bucket = <T, K>(
  iterable: Iterable<T>,
  key: (item: T) => K,
): Map<K, T[]> => {
  const buckets = new Map<K, T[]>();
  for (const item of iterable) {
    const k = key(item);
    if (!buckets.has(k)) {
      buckets.set(k, []);
    }
    buckets.get(k)!.push(item);
  }
  return buckets;
};
