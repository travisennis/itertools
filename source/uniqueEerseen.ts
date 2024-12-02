/**
 * Yield unique elements, preserving order
 */
export const uniqueEerseen = function* <T>(
  iterable: Iterable<T>,
): Generator<T> {
  const seen = new Set<T>();
  for (const item of iterable) {
    if (!seen.has(item)) {
      seen.add(item);
      yield item;
    }
  }
};
