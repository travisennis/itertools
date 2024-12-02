/**
 * Find the first element where a predicate becomes true
 */
export const locate = function* <T>(
  iterable: Iterable<T>,
  predicate: (x: T) => boolean,
): Generator<number> {
  let idx = 0;
  for (const item of iterable) {
    if (predicate(item)) {
      yield idx;
    }
    idx++;
  }
};
