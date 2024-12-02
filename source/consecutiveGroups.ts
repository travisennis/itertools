/**
 * Group consecutive elements that share the same key
 */
export const consecutiveGroups = function* <T, K>(
  iterable: Iterable<T>,
  key: (x: T) => K = (x) => x as unknown as K,
): Generator<T[]> {
  let group: T[] = [];
  let lastKey: K | undefined;

  for (const item of iterable) {
    const k = key(item);
    if (lastKey !== undefined && k !== lastKey) {
      yield group;
      group = [];
    }
    group.push(item);
    lastKey = k;
  }
  if (group.length) yield group;
};
